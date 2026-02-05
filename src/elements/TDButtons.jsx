import { NavLink } from "react-router-dom";
import { ListTodo,MonitorCheck,Sun,NotepadText,Calendar1,Apple } from "lucide-react";
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
}