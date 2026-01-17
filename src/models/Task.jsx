import { useState, useEffect } from "react";
import { TASK_CATEGORIES,isTaskOverdue } from "../utils/Taskutils";
import { formatShortDate } from "../utils/date";
import { updateTaskInDB,removeTask,toggleCompleteTaskWithChildren,addTaskToDB } from "../utils/db";
import TaskCreateModal from "./TaskCreationModal";
import './task.css';

export default function TaskModal({ task, level = 0 }) {
  const [completed, setCompleted] = useState(task.completed);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  
  useEffect(() => {
    setCompleted(task.completed);
  }, [task]);
  const toggleCompleted = () => {
    setCompleted(!completed);
    toggleCompleteTaskWithChildren(task.id, !completed);
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  }
  async function handleUpdateTask(updatedTask) {
    await updateTaskInDB(updatedTask);
  }
  async function handleSaveTask(newtask) {
    await addTaskToDB(newtask);
  }

  return (
    <>
      {isEditModalOpen && <TaskCreateModal
        task={task}
        isEditMode={true}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateTask}
      />}
      {isCreateModalOpen && <TaskCreateModal
        task={task}
        isEditMode={false}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveTask}
      />}
      <li 
        key={task.id}
        className="task-row"
        style={{ marginLeft: level * 20 }}
        >
          {level > 0 && <span className="child-indicator">↳</span>}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
          />
        <div className={`task-content ${task.completed ? "completed" : ""}`}>
          <span className="task-title">{task.text}</span>
          <span className={`task-date ${isTaskOverdue(task) ? "overdue" : ""}`}>{formatShortDate(task.dueDate)}</span>
        </div>
        <span
          className={`task-category ${task.completed ? "completed" : ""}`}
          style={{ backgroundColor: TASK_CATEGORIES[task.category].color }}
          >
          {task.category}
        </span>
        <button onClick={() => openEditModal()}>Edit</button>
        <button onClick={() => openCreateModal()}>Add</button>
        <button onClick={() => removeTask(task.id)} type="submit">x</button>
      </li>
      {task.children?.map(child => (
          <TaskModal
            key={child.id}
            task={child}
            level={level + 1}
          />
      ))}
    </>
);
}