function Sidebar({ activePage, onChangePage }) {
  return (
    <aside className="sidebar">
      <div className="logo">ServiceDesk</div>

      <nav className="sidebarNav">
        <button
          className={activePage === "dashboard" ? "activeNav" : ""}
          onClick={() => onChangePage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={activePage === "orders" ? "activeNav" : ""}
          onClick={() => onChangePage("orders")}
        >
          Orders
        </button>

        <button
          className={activePage === "clients" ? "activeNav" : ""}
          onClick={() => onChangePage("clients")}
        >
          Clients
        </button>

        <button
          className={activePage === "analytics" ? "activeNav" : ""}
          onClick={() => onChangePage("analytics")}
        >
          Analytics
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
