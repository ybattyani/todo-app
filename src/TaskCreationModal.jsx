import React, { useState } from "react";
import { createTask,TASK_CATEGORIES,PRIORITY_LEVELS } from "./models/Task";
import './TaskCreationModal.css';

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(TASK_CATEGORIES.PERSONAL.label);
  const [priority, setPriority] = useState(PRIORITY_LEVELS.normal);
  if (!isOpen) return null; // don't render anything if modal is closed

  const handleAdd = () => {
    if (text.trim() === "") return;
    const newTask = createTask({ title: text , category: category});
    onAddTask(newTask);
    setText("");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Task</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
          className="modal-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {Object.entries(TASK_CATEGORIES).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>
        <div className="modal-buttons">
          <button onClick={handleAdd} className="task-add-btn">
            Add
          </button>
          <button onClick={onClose} className="task-cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
