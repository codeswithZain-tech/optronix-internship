import { useUIStore } from "../store/useUIStore";

export default function Settings() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>
      <button onClick={toggleSidebar} style={{ padding: "8px 16px", cursor: "pointer" }}>
        Sidebar: {sidebarOpen ? "Open" : "Closed"}
      </button>
    </div>
  );
}
