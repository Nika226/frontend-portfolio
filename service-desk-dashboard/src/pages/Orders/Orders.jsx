import { useState } from "react";
import OrdersTable from "../../components/OrdersTable/OrdersTable";

function Orders({ orders, setOrders, clients }) {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newOrder, setNewOrder] = useState({
    client: "",
    service: "",
    status: "Open",
    priority: "Medium",
    date: "",
  });

  const filteredOrders = orders.filter((order) => {
    const searchText = searchValue.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.client.toLowerCase().includes(searchText) ||
      order.service.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setNewOrder({
      client: "",
      service: "",
      status: "Open",
      priority: "Medium",
      date: "",
    });
    setEditingOrderId(null);
    setIsFormOpen(false);
  };

  const handleSubmitOrder = (event) => {
    event.preventDefault();

    if (editingOrderId) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === editingOrderId ? { ...order, ...newOrder } : order,
        ),
      );

      resetForm();
      return;
    }

    const getNextOrderId = () => {
      const orderNumbers = orders.map((order) =>
        Number(order.id.replace("ORD-", "")),
      );

      const maxOrderNumber = Math.max(...orderNumbers, 1000);

      return `ORD-${maxOrderNumber + 1}`;
    };

    const orderToAdd = {
      id: getNextOrderId(),
      ...newOrder,
    };

    setOrders((prevOrders) => [orderToAdd, ...prevOrders]);
    resetForm();
  };

  const handleEditOrder = (order) => {
    setNewOrder({
      client: order.client,
      service: order.service,
      status: order.status,
      priority: order.priority,
      date: order.date,
    });

    setEditingOrderId(order.id);
    setIsFormOpen(true);
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId),
    );
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  return (
    <main className="mainContent">
      <header className="header">
        <div>
          <p className="eyebrow">Service operations</p>
          <h1>Orders</h1>
        </div>

        <button
          className="primaryBtn"
          onClick={() => {
            if (isFormOpen) {
              resetForm();
            } else {
              setIsFormOpen(true);
            }
          }}
        >
          {isFormOpen ? "Close form" : "+ New Order"}
        </button>
      </header>

      {isFormOpen && (
        <form className="orderForm" onSubmit={handleSubmitOrder}>
          <select
            name="client"
            value={newOrder.client}
            onChange={handleChange}
            required
          >
            <option value="">Select client</option>

            {clients.map((client) => (
              <option key={client.id} value={client.company}>
                {client.company}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="service"
            placeholder="Service description"
            value={newOrder.service}
            onChange={handleChange}
            required
          />

          <select name="status" value={newOrder.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            name="priority"
            value={newOrder.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input
            type="date"
            name="date"
            value={newOrder.date}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primaryBtn">
            {editingOrderId ? "Save Changes" : "Add Order"}
          </button>
        </form>
      )}

      <section className="toolbar">
        <input
          type="text"
          placeholder="Search by order, client or service..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </section>

      <OrdersTable
        orders={filteredOrders}
        onDeleteOrder={handleDeleteOrder}
        onEditOrder={handleEditOrder}
        onStatusChange={handleStatusChange}
      />
    </main>
  );
}

export default Orders;
