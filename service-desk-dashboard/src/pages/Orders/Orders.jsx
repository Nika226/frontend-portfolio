import { useState } from "react";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import EditOrderModal from "../../components/EditOrderModal/EditOrderModal";

function Orders({ orders, setOrders, clients, addActivity }) {
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [newOrder, setNewOrder] = useState({
    client: "",
    service: "",
    status: "Open",
    priority: "Medium",
    date: "",
  });

  const filteredOrders = [...orders]
    .filter((order) => {
      const searchText = searchValue.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchText) ||
        order.client.toLowerCase().includes(searchText) ||
        order.service.toLowerCase().includes(searchText) ||
        order.status.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOption === "newest") {
        return (
          Number(b.id.replace("ORD-", "")) - Number(a.id.replace("ORD-", ""))
        );
      }

      if (sortOption === "oldest") {
        return (
          Number(a.id.replace("ORD-", "")) - Number(b.id.replace("ORD-", ""))
        );
      }

      if (sortOption === "priority") {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      if (sortOption === "status") {
        return a.status.localeCompare(b.status);
      }

      return 0;
    });

  const getNextOrderId = () => {
    const orderNumbers = orders.map((order) =>
      Number(order.id.replace("ORD-", "")),
    );

    const maxOrderNumber = Math.max(...orderNumbers, 1000);

    return `ORD-${maxOrderNumber + 1}`;
  };

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

    setIsFormOpen(false);
  };

  const handleSubmitOrder = (event) => {
    event.preventDefault();

    const orderToAdd = {
      id: getNextOrderId(),
      ...newOrder,
    };

    setOrders((prevOrders) => [orderToAdd, ...prevOrders]);

    addActivity(
      "order-created",
      `Order ${orderToAdd.id} created`,
      `/orders/${orderToAdd.id}`,
    );

    resetForm();
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
  };

  const handleEditOrderChange = (event) => {
    const { name, value } = event.target;

    setEditingOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSaveEditedOrder = (event) => {
    event.preventDefault();

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === editingOrder.id ? editingOrder : order,
      ),
    );

    addActivity(
      "order-edited",
      `Order ${editingOrder.id} edited`,
      `/orders/${editingOrder.id}`,
    );

    setEditingOrder(null);
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId),
    );

    addActivity("order-deleted", `Order ${orderId} deleted`);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );

    addActivity(
      "status-changed",
      `Order ${orderId} status changed to ${newStatus}`,
      `/orders/${orderId}`,
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
            Add Order
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
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>

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

      {editingOrder && (
        <EditOrderModal
          editingOrder={editingOrder}
          clients={clients}
          onClose={() => setEditingOrder(null)}
          onSave={handleSaveEditedOrder}
          onChange={handleEditOrderChange}
        />
      )}
    </main>
  );
}

export default Orders;
