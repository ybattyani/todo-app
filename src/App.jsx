import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc ,updateDoc} from "firebase/firestore";
import { db } from "./firebase";
import TaskCreationModal from "./TaskCreationModal";
import { createTask,TASK_CATEGORIES,PRIORITY_LEVELS } from "./models/Task";
import { formatShortDate } from "./utils/date";
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);


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
    await addDoc(collection(db, "tasks"), {
      text: newTask.text,
      createdAt: newTask.createdAt,
      completed: false,
      dueDate: newTask.dueDate,
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
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };
  const openCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };
  async function handleSaveTask(task) {
    if (taskToEdit) {
      // EDIT
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, task);
      setTaskToEdit(null);
    } else {
      // CREATE
      setTasks((prev) => [...prev, task]);
      await addDoc(collection(db, "tasks"), {
        text: task.text,
        createdAt: task.createdAt,
        completed: false,
        dueDate: task.dueDate,
        category: task.category,
        priority: task.priority,
        parentId: task.parentId || null,
      });
    }
  };


  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <div style={{ padding: 20 }}>
      <h1>My To-Do List</h1>
      <button onClick={() => openCreateModal()} className="task-add-btn">
        Add Task
      </button>
      <TaskCreationModal
        task={taskToEdit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        // onAddTask={(taskText) => addTask(taskText)}
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
            <div className={`task-content ${task.completed ? "completed" : ""}`}>
              <span className="task-title">{task.text}</span>
              <span className="task-date">{formatShortDate(task.dueDate)}</span>
            </div>
            <span
              className={`task-category ${task.completed ? "completed" : ""}`}
              style={{ backgroundColor: TASK_CATEGORIES[task.category].color }}
            >
              {task.category}
            </span>
            <button onClick={() => openEditModal(task)}>Edit</button>
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