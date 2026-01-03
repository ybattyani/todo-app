import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc ,updateDoc} from "firebase/firestore";
import { db } from "./firebase";
import TaskModal from "./TaskCreationModal";
import { TASK_CATEGORIES,PRIORITY_LEVELS } from "./models/Task";
import { formatShortDate } from "./utils/date";
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate', 'category', etc.
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  // const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

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

      {isModalOpen && <TaskModal
        task={taskToEdit}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />}
      <ul>
        {sortedTasks().map((task) => (
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