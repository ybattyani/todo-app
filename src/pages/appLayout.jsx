import SideBarMenu from "../elements/SideBarMenu.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <SideBarMenu/>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
