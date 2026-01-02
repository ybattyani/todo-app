import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc ,updateDoc} from "firebase/firestore";
import { db } from "./firebase";
import TaskCreationModal from "./TaskCreationModal";
import { TASK_CATEGORIES,PRIORITY_LEVELS } from "./models/Task";


import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  // const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  async function addTask(newTask) {
    
    setTasks((prev) => [...prev, newTask]);
    // const newTask = { id: Date.now(), text: taskText, completed: false, deadline: Date.now() };
    // setTasks([...tasks, newTask]);
    console.log("Adding task to Firebase:", newTask);
    await addDoc(collection(db, "tasks"), {
      text: newTask.title,
      createdAt: newTask.createdAt,
      completed: false,
      deadline: newTask.createdAt + 86400000, // default deadline 24h later
      category: newTask.category,
      priority: newTask.priority,
      parentId: newTask.parentId || null,
    });
  }
  async function removeTask(id) {
    await deleteDoc(doc(db, "tasks", id));
  }
  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Update Firebase
    const taskRef = doc(db, "tasks", id.toString());
    updateDoc(taskRef, { completed: !tasks.find(t => t.id === id).completed });
  };
  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <div style={{ padding: 20 }}>
      <h1>My To-Do List</h1>
      <button onClick={() => setIsModalOpen(true)} className="task-add-btn">
        Add Task
      </button>
      <TaskCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={(taskText) => addTask(taskText)}
      />

      <ul>
        {sortedTasks.map((task) => (
          <li 
            key={task.id}
            className="task-row"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
            />
            <span className={`task-text ${task.completed ? "completed" : ""}`}>
              {task.text}
            </span>
            <span className={`task-text ${task.completed ? "completed" : ""}`}>
              {task.deadline}
            </span>
            <span
              className="task-category"
              style={{ backgroundColor: TASK_CATEGORIES[task.category].color }}
            >
              {task.category}
            </span>

            <button 
              onClick={() => removeTask(task.id)}
              type="submit"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;