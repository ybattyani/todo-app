import React, { useState,useEffect,useRef } from "react";
import { createTask,TASK_CATEGORIES,PRIORITY_LEVELS } from "../utils/Taskutils";
import { subscribeToTasks } from "../utils/db";
import { getDate } from "../utils/date";
import './TaskCreationModal.css';

export default function TaskCreateModal({ task, onClose, onSave }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState("PERSONAL");
  const [dueDate, setDueDate] = useState(getDate());
  const [parentId, setParentId] = useState(null);
  const [priority, setPriority] = useState(PRIORITY_LEVELS.normal);
  const isEditMode = Boolean(task);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (task) {
      setText(task.text);
      setDescription(task.description);
      setCategory(task.category);
      setDueDate(task.dueDate);
      setParentId(task.parentId);
      setPriority(task.priority);
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
      task = createTask({ 
        text: text,
        description: description,
        category: category,
        dueDate:dueDate,
        parentId: parentId,
        priority: priority 
      });
      onSave(task);
    }else{
      const updatedTask = {
        ...task,           // keeps id & completed state
        text,
        description,
        category,
        dueDate,
        parentId,
        priority,
      };
      onSave(updatedTask);
    }
    closeModal();
  };
  const closeModal = () => {
    setText("");
    setDescription('');
    setCategory("PERSONAL");
    setDueDate(getDate());
    setParentId(null);
    setPriority(PRIORITY_LEVELS.normal);
    onClose();
  }
  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditMode ? "Edit Task" : "New Task"}</h2>
        Task Name:
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
          Parent:
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
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
              <option key={key} value={value}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          Description (Optional):
          <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="modal-input"
        />
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
