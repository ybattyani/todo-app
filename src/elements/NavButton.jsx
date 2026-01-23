import { NavLink } from "react-router-dom";
import { ListTodo,MonitorCheck,Sun,NotepadText } from "lucide-react";
import './NavButton.css';

export function SideBarButton({ onClose }) {
return (
    <nav className="sidebar-nav">
      <NavLink to="/todo-app/" end className="sidebar-link" onClick={()=>onClose(false)}>
        <MonitorCheck size={18} />Main
      </NavLink>
      <NavLink to="/todo-app/todoList" className="sidebar-link" onClick={()=>onClose(false)}>
        <ListTodo size={18} />To Do List
      </NavLink>
      <NavLink to="/todo-app/morning-flow" className="sidebar-link" onClick={()=>onClose(false)}>
        <Sun size={18} />Morning Flow
      </NavLink>
      <NavLink to="/todo-app/backlog" className="sidebar-link" onClick={()=>onClose(false)}>
        <NotepadText size={18} />Backlog
      </NavLink>
    </nav>
  );
}

export function MainNavButton() {
  return (
      <div className="big-actions">
        <NavLink to="/todo-app/todoList" className="action-tile">
          <ListTodo size={60} />
          <span>Tasks</span>
        </NavLink>
        <NavLink to="/todo-app/morning-flow" className="action-tile">
          <Sun size={60} />
          <span>Morning Flow</span>
        </NavLink>
        <NavLink to="/todo-app/backlog" className="action-tile">
          <NotepadText size={60} />
          <span>Backlog</span>
        </NavLink>
      </div>
    );
  }