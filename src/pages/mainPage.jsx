import { NavLink } from "react-router-dom";
import { ListTodo,Sun } from "lucide-react";
import './mainPage.css';

export default function MainPage() {
  return (
    <div className="page">
      <h1>Main Page</h1>
      <p>Welcome!! <br/>In this app you will be able to manage your tasks and routines</p>
      <div className="big-actions">
        <NavLink to="/todo-app" className="action-tile">
          <ListTodo size={60} />
          <span>Tasks</span>
        </NavLink>
        <NavLink to="/morning-flow" className="action-tile">
          <Sun size={60} />
          <span>Morning Flow</span>
        </NavLink>
      </div>
    </div>
  );
}