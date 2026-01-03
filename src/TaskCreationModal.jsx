import React, { useState } from "react";
import { createTask,TASK_CATEGORIES,PRIORITY_LEVELS } from "./models/Task";
import { formatShortDate,getTomorrowDate } from "./utils/date";
import './TaskCreationModal.css';

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("PERSONAL");
  const [dueDate, setDueDate] = useState(getTomorrowDate());
  const [priority, setPriority] = useState(PRIORITY_LEVELS.normal);
  if (!isOpen) return null; // don't render anything if modal is closed

  const handleAdd = () => {
    if (text.trim() === "") return;
    const newTask = createTask({ title: text , category: category, deadline:formatShortDate(dueDate)});
    onAddTask(newTask);
    //Reset fields
    setText("");
    setDueDate(getTomorrowDate());
    setCategory("PERSONAL");
    setPriority(PRIORITY_LEVELS.normal);
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
        <div className="task-options">
          Category:
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
          Due date:
          <label className="form-label">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="task-date-input"
            />
          </label>
        </div>
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
