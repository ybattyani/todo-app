import { Menu } from "lucide-react";
import { useState, useRef } from "react";
import { SideBarButton } from "../elements/NavButton";
import './SideBarMenu.css';

export default function SideBarMenu({ onClose }) {
  const [open, setOpen] = useState(false);

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
        <SideBarButton onClose={setOpen} />
      </aside>
    </>
  );
}