import { useState, useEffect } from "react";
import { TASK_CATEGORIES,isTaskOverdue } from "../utils/Taskutils";
import { formatShortDate } from "../utils/date";
import { updateTaskInDB,removeTask,toggleCompleteTaskWithChildren,addTaskToDB } from "../utils/db";
import TaskCreateModal from "./TaskCreationModal";
import TaskMenu from "./taskMenu";
import './task.css';

export default function TaskModal({ task, level = 0, displayType = "FULL" }) {
  const [completed, setCompleted] = useState(task.completed);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  useEffect(() => {
    setCompleted(task.completed);
  }, [task]);
  const toggleCompleted = () => {
    setCompleted(!completed);
    toggleCompleteTaskWithChildren(task.id, !completed);
  };
  const taskContentDisplay = () => {
    return (
      <div className={`task-content ${task.completed ? "completed" : ""}`}>
        <span className="task-title clickable" onClick={() => setIsEditModalOpen(true)}>{task.text}</span>
        <span className={`task-date ${isTaskOverdue(task) ? "overdue" : ""}`}>{formatShortDate(task.dueDate)}</span>
        {displayType === "FULL" && <span className="task-category" style={{ color: TASK_CATEGORIES[task.category].color }}>{task.category}</span>}
      </div>
    );
  };
  return (
    <>
      {isEditModalOpen && <TaskCreateModal
        task={task}
        isEditMode={true}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateTaskInDB}
      />}
      {isCreateModalOpen && <TaskCreateModal
        task={task}
        isEditMode={false}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={addTaskToDB}
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
          {taskContentDisplay()}
        <TaskMenu
          onEdit={() => setIsEditModalOpen(true)}
          onCreate={() => setIsCreateModalOpen(true)}
          onDelete={() => removeTask(task.id)}
        />
      </li>
      {task.children?.map(child => (
          <TaskModal
            key={child.id}
            task={child}
            level={level + 1}
            displayType={displayType}
          />
      ))}
    </>
);
}