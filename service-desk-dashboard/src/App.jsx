import { useEffect, useState } from "react";
import "./index.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import Clients from "./pages/Clients/Clients";
import Analytics from "./pages/Analytics/Analytics";
import { mockOrders } from "./data/mockOrders";
import { mockClients } from "./data/mockClients";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("serviceDeskOrders");
    return savedOrders ? JSON.parse(savedOrders) : mockOrders;
  });
  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem("serviceDeskClients");
    return savedClients ? JSON.parse(savedClients) : mockClients;
  });

  useEffect(() => {
    localStorage.setItem("serviceDeskOrders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem("serviceDeskClients", JSON.stringify(clients));
  }, [clients]);

  const handleResetDemoData = () => {
    setOrders(mockOrders);
    setClients(mockClients);
    localStorage.removeItem("serviceDeskOrders");
    localStorage.removeItem("serviceDeskClients");
  };
  return (
    <div className="app">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />

      {activePage === "dashboard" && (
        <Dashboard orders={orders} onResetDemoData={handleResetDemoData} />
      )}
      {activePage === "orders" && (
        <Orders orders={orders} setOrders={setOrders} clients={clients} />
      )}
      {activePage === "clients" && (
        <Clients orders={orders} clients={clients} setClients={setClients} />
      )}
      {activePage === "analytics" && <Analytics orders={orders} />}
    </div>
  );
}

export default App;
