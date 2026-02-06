import React, { useState,useEffect,useRef } from "react";
import { createTask,TASK_CATEGORIES,PRIORITY_LEVELS } from "../utils/Taskutils";
import { subscribeToTasks } from "../utils/db";
import {AddTaskButton,CancelButton} from "../elements/TDButtons";
import {TDSelectObjectButton,DateSelector,TaskSelectorButton} from "../elements/TDElements";
import { getDate } from "../utils/date";
import './TaskCreationModal.css';

export default function TaskCreateModal({ task, isEditMode, onClose, onSave }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState("PERSONAL");
  const [dueDate, setDueDate] = useState(getDate());
  const [parentId, setParentId] = useState(null);
  const [priority, setPriority] = useState("NORMAL");
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (task && isEditMode) {
      setText(task.text);
      setDescription(task.description);
      setCategory(task.category);
      setDueDate(task.dueDate);
      setParentId(task.parentId);
      setPriority(task.priority);
    }
    if (task && !isEditMode) {
      setCategory(task.category);
      setDueDate(task.dueDate);
      setParentId(task.id);
    }
  }, [task]);
  useEffect(() => {
    // focus input when modal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const unsubscribe = subscribeToTasks(setTasks);
    return () => unsubscribe();
  }, []); // run once on mount

  const handleSubmit = (e) => {
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
  const handleSubmitAndClose = (e) => {
    e.preventDefault();
    handleSubmit(e);
    closeModal();
  }
  const handleSubmitAndReOpen = (e) => {
    e.preventDefault();
    handleSubmit(e);
    // Re-open modal for new task
    if (!isEditMode) {
      setText("");
      setDescription('');
      setCategory("PERSONAL");
      setDueDate(getDate());
      setParentId(null);
      setPriority(PRIORITY_LEVELS.normal);
    }
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
          <TDSelectObjectButton
            onChange={(e) => setCategory(e.target.value)}
            title="Category"
            isSelected={category}
            options={TASK_CATEGORIES}
          />
          <DateSelector onChange={(e) => setDueDate(e.target.value)} title="Due date" isSelected={dueDate}/>
          <TaskSelectorButton onChange={(e) => setParentId(e.target.value || null)} title="Parent" isSelected={parentId} tasks=
            {tasks
              .filter(t => !t.parentId)
              .filter(t => !t.completed) // only allow non-completed tasks as parents
              }/>
           <TDSelectObjectButton
            onChange={(e) => setPriority(e.target.value)}
            title="Priority"
            isSelected={priority}
            options={PRIORITY_LEVELS}
          />
        </div>
        <div>
          Description (Optional):
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="task-textarea"
          />
        </div>
        <div className="modal-buttons">
          <AddTaskButton onClick={handleSubmitAndClose} title={isEditMode ? "Save" : "Add"}/>
          {!isEditMode && (
            <AddTaskButton onClick={handleSubmitAndReOpen} title="Add & New"/>
          )}
          <CancelButton onClick={closeModal}/>
        </div>
      </div>
    </div>
  );
}
