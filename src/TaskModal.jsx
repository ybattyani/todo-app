import React, { useState } from "react";
import './taskmodal.css';

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  const [text, setText] = useState("");

  if (!isOpen) return null; // don't render anything if modal is closed

  const handleAdd = () => {
    if (text.trim() === "") return;
    console.log("Adding task:", text);
    onAddTask(text);
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
          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }} // allow Enter to add task
        />
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
