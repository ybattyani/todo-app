import { useState, useEffect } from "react";
import TaskCreateModal from "./models/TaskCreationModal";
import TaskModal from "./models/Task";
import { TASK_CATEGORIES,buildTaskTree,sortTasks,isTaskOverdue } from "./utils/Taskutils";
import { subscribeToTasks,addTaskToDB } from "./utils/db";
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('ACTIVE');
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const taskTree = buildTaskTree(sortTasks(tasks));
  const visibleTasks = filterTasks(taskTree, filter);

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
  function filterTasks(tasks) {
    switch (filter) {
      case "ALL":
        return tasks;
      case "COMPLETED":
        return tasks.filter(task => task.completed);
      case "ACTIVE":
        return tasks.filter(task => !task.completed);
      case "OVERDUE":
        return tasks.filter(task => isTaskOverdue(task));
      case "CATEGORY":
        if(categoryFilter === "ALL") {
          return tasks;
        }
        return tasks.filter(task => task.category === categoryFilter);
      default:
        return tasks;
    }
  }


  return (
    <div style={{ padding: 20 }}>
      <h1>My To-Do List</h1>
      <div> 
        <button onClick={() => openCreateModal()} className="task-add-btn">
          Add Task
        </button>
      </div>
      <div className="filter-bar">
        Filters:
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          >
          <option value="ALL">All Tasks</option>
          <option value="ACTIVE">Active</option>
          <option value="OVERDUE">Overdue</option>
          <option value="CATEGORY">Category</option>
          <option value="COMPLETED">Completed</option>
        </select>
        Categories:
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          >
          <option value="ALL">All</option>
          {Object.entries(TASK_CATEGORIES).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>
      </div>

      {isModalOpen && <TaskCreateModal
        task={null}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />}
      <ul>
        {visibleTasks.map(task => (
          <TaskModal key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

export default App;