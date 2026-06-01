import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import Clients from "./pages/Clients/Clients";
import Analytics from "./pages/Analytics/Analytics";
import { mockOrders } from "./data/mockOrders";
import { mockClients } from "./data/mockClients";
import OrderDetails from "./pages/OrderDetails/OrderDetails";

function App() {
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
      <Sidebar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard orders={orders} onResetDemoData={handleResetDemoData} />
          }
        />

        <Route
          path="/orders"
          element={
            <Orders orders={orders} setOrders={setOrders} clients={clients} />
          }
        />

        <Route
          path="/clients"
          element={
            <Clients
              orders={orders}
              clients={clients}
              setClients={setClients}
            />
          }
        />
        <Route
          path="/orders/:orderId"
          element={<OrderDetails orders={orders} />}
        />

        <Route path="/analytics" element={<Analytics orders={orders} />} />
      </Routes>
    </div>
  );
}

export default App;
