import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">ServiceDesk</div>

      <nav className="sidebarNav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/clients">Clients</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
        <NavLink to="/activity">Activity</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
