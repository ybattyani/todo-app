import { NavLink } from "react-router-dom";
import { ListTodo,MonitorCheck,Menu,Sun,NotepadText } from "lucide-react";
import { useState, useRef } from "react";
import './SideBarMenu.css';

export default function SideBarMenu({ onClose }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

return (
    <>
    <button
        className="sidebar-toggle"
        onClick={() => setOpen(!open)}
      >
        <Menu size={20} />
      </button>

      {/* Backdrop for mobile */}
      <div
        className={`sidebar-backdrop ${open ? "show" : ""}`}
        onClick={()=>setOpen(false)}
      />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="sidebar-title">My App</h2>
        <nav className="sidebar-nav">
          <NavLink to="/" className="sidebar-link" onClick={()=>setOpen(false)}>
            <MonitorCheck size={18} /> Main
          </NavLink>
          <NavLink to="/todo-app/" className="sidebar-link" onClick={()=>setOpen(false)}>
            <ListTodo size={18} />To Do List
          </NavLink>
          <NavLink to="/morning-flow" className="sidebar-link" onClick={()=>setOpen(false)}>
            <Sun size={18} />
            Morning Flow
          </NavLink>
          <NavLink to="/backlog" className="sidebar-link" onClick={()=>setOpen(false)}>
            <NotepadText size={18} />
            Backlog
          </NavLink>
        </nav>
      </aside>
    </>
  );
}