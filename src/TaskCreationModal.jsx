import React, { useState,useEffect,useRef } from "react";
import { createTask,TASK_CATEGORIES,PRIORITY_LEVELS } from "./models/Task";
import { getDate } from "./utils/date";
import './TaskCreationModal.css';

export default function TaskModal({ task, onClose, onSave }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("PERSONAL");
  const [dueDate, setDueDate] = useState(getDate());
  const [priority, setPriority] = useState(PRIORITY_LEVELS.normal);
  const isEditMode = Boolean(task);
  const inputRef = useRef(null);

  
  useEffect(() => {
    if (task) {
      setText(task.text);
      setCategory(task.category);
      setDueDate(task.dueDate);
      setPriority(task.priority);
    }
  }, [task]);
  useEffect(() => {
    // focus input when modal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // run once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditMode) {
      task = createTask({ text: text , category: category, dueDate:dueDate});
      onSave(task);
    }else{
      const updatedTask = {
        ...task,           // keeps id & completed state
        text,
        category,
        dueDate,
      };
      onSave(updatedTask);
    }
    closeModal();
  };
  const closeModal = () => {
    setText("");
    setDueDate(getDate());
    setCategory("PERSONAL");
    setPriority(PRIORITY_LEVELS.normal);
    onClose();
  }
  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditMode ? "Edit Task" : "New Task"}</h2>
        <input
          ref={inputRef}
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
          <button onClick={handleSubmit} className="task-add-btn">
            {isEditMode ? "Save" : "Add"}
          </button>
          <button onClick={closeModal} className="task-cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
