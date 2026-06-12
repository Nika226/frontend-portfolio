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
import ClientDetails from "./pages/ClientDetails/ClientDetails";
import Activity from "./pages/Activity/Activity";

function App() {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("serviceDeskOrders");
    return savedOrders ? JSON.parse(savedOrders) : mockOrders;
  });

  const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem("serviceDeskClients");
    return savedClients ? JSON.parse(savedClients) : mockClients;
  });

  const [activityLog, setActivityLog] = useState(() => {
    const savedActivityLog = localStorage.getItem("serviceDeskActivityLog");
    return savedActivityLog ? JSON.parse(savedActivityLog) : [];
  });

  useEffect(() => {
    localStorage.setItem("serviceDeskOrders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("serviceDeskClients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("serviceDeskActivityLog", JSON.stringify(activityLog));
  }, [activityLog]);

  const handleResetDemoData = () => {
    setOrders(mockOrders);
    setClients(mockClients);
    localStorage.removeItem("serviceDeskOrders");
    localStorage.removeItem("serviceDeskClients");
  };

  const addActivity = (type, message, link = "") => {
    const activityToAdd = {
      id: Date.now(),
      type,
      message,
      link,
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setActivityLog((prevLog) => [activityToAdd, ...prevLog].slice(0, 20));
  };

  return (
    <div className="app">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              orders={orders}
              activityLog={activityLog}
              onResetDemoData={handleResetDemoData}
            />
          }
        />

        <Route
          path="/orders"
          element={
            <Orders
              orders={orders}
              setOrders={setOrders}
              clients={clients}
              addActivity={addActivity}
            />
          }
        />

        <Route
          path="/clients"
          element={
            <Clients
              orders={orders}
              clients={clients}
              setClients={setClients}
              addActivity={addActivity}
            />
          }
        />
        <Route
          path="/clients/:clientId"
          element={<ClientDetails clients={clients} orders={orders} />}
        />
        <Route
          path="/orders/:orderId"
          element={<OrderDetails orders={orders} />}
        />

        <Route
          path="/analytics"
          element={<Analytics orders={orders} clients={clients} />}
        />
        <Route
          path="/activity"
          element={<Activity activityLog={activityLog} />}
        />
      </Routes>
    </div>
  );
}

export default App;
