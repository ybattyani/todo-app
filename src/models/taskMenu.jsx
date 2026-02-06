import { useState, useRef, useEffect } from "react";
import {MenuButton} from "../elements/TDButtons";
import { Pencil, Trash2, LayersPlus } from "lucide-react";
import './taskMenu.css';

export default function TaskMenu({ onEdit, onCreate, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="task-menu" ref={menuRef}>
      <MenuButton onClick={() => setOpen((v) => !v)}/>

      {open && (
        <div className="task-menu-dropdown">
          <button onClick={onEdit} data-cy="task-menu-edit">
            <Pencil size={14} /> Edit
          </button>
          <button onClick={onCreate} data-cy="task-menu-subtask">
            <LayersPlus size={14} />Subtask
          </button>
          <button className="danger" onClick={onDelete} data-cy="task-menu-delete">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
