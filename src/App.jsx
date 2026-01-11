import { useState, useEffect } from "react";
import TaskCreateModal from "./models/TaskCreationModal";
import { TASK_CATEGORIES,buildTaskTree } from "./utils/Taskutils";
import TaskModal from "./models/Task";
import { subscribeToTasks,addTaskToDB } from "./utils/db";
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('completed'); // 'dueDate', 'category', etc.
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const taskTree = buildTaskTree(tasks);

  useEffect(() => {
    const unsubscribe = subscribeToTasks(setTasks);
    return () => unsubscribe();
  }, []);
  async function handleSaveTask(task) {
    // CREATE
    setTasks((prev) => [...prev, task]);
    await addTaskToDB(task);
  };
  const openCreateModal = () => {
    setIsModalOpen(true);
  };
  const sortedTasks = () => {
    let sorted = [...tasks];
    if (sortBy) {
      sorted.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    }
    return sorted;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My To-Do List</h1>
      <button onClick={() => openCreateModal()} className="task-add-btn">
        Add Task
      </button>
      <div className="sort-controls">
        <label>Sort by: </label>
        <select
          value={sortBy || ""}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="completed">Completed</option>
          <option value="dueDate">Due Date</option>
          <option value="category">Category</option>
          <option value="text">Text</option>
        </select>

        <button onClick={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }>
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {isModalOpen && <TaskCreateModal
        task={null}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />}
      <ul>
        {taskTree.map((task) => (
          <TaskModal task={task} key={task.id}/>
        ))}
      </ul>
    </div>
  );
}

export default App;