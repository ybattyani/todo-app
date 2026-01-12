import React, { useState,useEffect,useRef } from "react";
import { createTask,TASK_CATEGORIES,PRIORITY_LEVELS } from "../utils/Taskutils";
import { subscribeToTasks } from "../utils/db";
import { getDate } from "../utils/date";
import './TaskCreationModal.css';

export default function TaskCreateModal({ task, onClose, onSave }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("PERSONAL");
  const [dueDate, setDueDate] = useState(getDate());
  const [priority, setPriority] = useState(PRIORITY_LEVELS.normal);
  const [parentId, setParentId] = useState(null);
  const isEditMode = Boolean(task);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (task) {
      setText(task.text);
      setCategory(task.category);
      setDueDate(task.dueDate);
      setPriority(task.priority);
      setParentId(task.parentId);
    }
  }, [task]);
  useEffect(() => {
    // focus input when modal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
    //
    const unsubscribe = subscribeToTasks(setTasks);
    return () => unsubscribe();
  }, []); // run once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditMode) {
      task = createTask({ text: text , category: category, dueDate:dueDate, parentId: parentId });
      onSave(task);
    }else{
      const updatedTask = {
        ...task,           // keeps id & completed state
        text,
        category,
        dueDate,
        parentId,
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
    setParentId(null);
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
        <div>Parent:
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value || null)}
            >
            <option value="">No parent</option>
            {tasks
              .filter(t => !t.parentId)
              .filter(t => !t.completed) // only allow non-completed tasks as parents
              .map(task => (
                <option key={task.id} value={task.id}>
                  {task.text}
                </option>
              ))}
          </select>
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
