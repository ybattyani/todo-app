import { NavLink } from "react-router-dom";
import { EllipsisVertical,Menu , Pencil, Trash2, LayersPlus } from "lucide-react";
import './TDButtons.css';

export function AddTaskButton({ onClick, title="Add" }) {
  return (
    <button onClick={onClick} className="task-add-btn" data-cy="task-create-button">
      {title}
    </button>
  )
}
export function CancelButton({onClick, title="Cancel"}){
  return (
    <button onClick={onClick} className="task-cancel-btn" data-cy="task-cancel-button">
      {title}
    </button>
  )
}export function BasicButton({ onClick, title="Button" }) {
  return (
    <button
      className="task-add-btn"
      onClick={onClick}
      data-cy={`TD-Basic-Button-${title}`}
    >
      {title}
    </button>
  )
}
export function MenuButton({onClick}){
  return (
    <button
      className="icon-btn"
      onClick={onClick}
      aria-label="Task actions"
    >
      <EllipsisVertical className="icon-mobile" size={18} />
      <Menu className="icon-desktop" size={20} />
    </button>
  )
}