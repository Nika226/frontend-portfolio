import { Link } from "react-router-dom";
function OrdersTable({ orders, onDeleteOrder, onEditOrder, onStatusChange }) {
  return (
    <section className="tableSection">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Recent activity</p>
          <h2>Latest service orders</h2>
        </div>

        <button className="secondaryBtn">View all orders</button>
      </div>

      <div className="tableWrapper">
        <table className="ordersTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client</th>
              <th>Service</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              {(onDeleteOrder || onEditOrder) && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link className="tableLink" to={`/orders/${order.id}`}>
                      {order.id}
                    </Link>
                  </td>
                  <td>{order.client}</td>
                  <td>{order.service}</td>
                  <td>
                    {onStatusChange ? (
                      <select
                        className={`statusSelect ${order.status
                          .replace(/\s+/g, "")
                          .toLowerCase()}`}
                        value={order.status}
                        onChange={(event) =>
                          onStatusChange(order.id, event.target.value)
                        }
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      <span
                        className={`statusBadge ${order.status
                          .replace(/\s+/g, "")
                          .toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`priorityBadge ${order.priority.toLowerCase()}`}
                    >
                      {order.priority}
                    </span>
                  </td>
                  <td>{order.date}</td>

                  {(onDeleteOrder || onEditOrder) && (
                    <td>
                      <div className="tableActions">
                        {onEditOrder && (
                          <button
                            className="editOrderBtn"
                            onClick={() => onEditOrder(order)}
                          >
                            Edit
                          </button>
                        )}

                        {onDeleteOrder && (
                          <button
                            className="deleteOrderBtn"
                            onClick={() => onDeleteOrder(order.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={onDeleteOrder || onEditOrder ? "7" : "6"}
                  className="emptyTableCell"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OrdersTable;
