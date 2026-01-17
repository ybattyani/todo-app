import { useState, useRef, useEffect } from "react";
import { EllipsisVertical,Menu , Pencil, Trash2, LayersPlus } from "lucide-react";
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
      <button
        className="icon-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Task actions"
      >
        <EllipsisVertical className="icon-mobile" size={18} />
        <Menu className="icon-desktop" size={20} />
      </button>

      {open && (
        <div className="task-menu-dropdown">
          <button onClick={onEdit}>
            <Pencil size={14} /> Edit
          </button>
          <button onClick={onCreate}>
            <LayersPlus size={14} />Subtask
          </button>
          <button className="danger" onClick={onDelete}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
