import { useState } from "react";
import SideBarMenu from "../models/SideBarMenu.jsx";
import { Menu } from "lucide-react";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <SideBarMenu/>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
