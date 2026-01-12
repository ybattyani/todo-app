import { useState, useEffect } from "react";
import TaskCreateModal from "./models/TaskCreationModal";
import TaskModal from "./models/Task";
import { buildTaskTree,sortTasks } from "./utils/Taskutils";
import { subscribeToTasks,addTaskToDB } from "./utils/db";
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const taskTree = buildTaskTree(sortTasks(tasks));

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

  return (
    <div style={{ padding: 20 }}>
      <h1>My To-Do List</h1>
      <button onClick={() => openCreateModal()} className="task-add-btn">
        Add Task
      </button>

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