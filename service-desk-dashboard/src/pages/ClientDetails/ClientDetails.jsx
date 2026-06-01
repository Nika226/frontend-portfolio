import { Link, useParams } from "react-router-dom";

function ClientDetails({ clients, orders }) {
  const { clientId } = useParams();

  const client = clients.find((item) => item.id === clientId);

  if (!client) {
    return (
      <main className="mainContent">
        <Link className="backLink" to="/clients">
          ← Back to clients
        </Link>

        <section className="detailsCard">
          <h1>Client not found</h1>
          <p>This client does not exist.</p>
        </section>
      </main>
    );
  }

  const clientOrders = orders.filter(
    (order) => order.client === client.company,
  );

  return (
    <main className="mainContent">
      <Link className="backLink" to="/clients">
        ← Back to clients
      </Link>

      <section className="detailsCard">
        <p className="eyebrow">Client details</p>
        <h1>{client.company}</h1>

        <div className="detailsGrid">
          <div>
            <span>Contact person</span>
            <strong>{client.contact}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{client.email}</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>{client.phone}</strong>
          </div>

          <div>
            <span>City</span>
            <strong>{client.city}</strong>
          </div>

          <div>
            <span>Active orders</span>
            <strong>
              {
                clientOrders.filter((order) => order.status !== "Completed")
                  .length
              }
            </strong>
          </div>
        </div>
      </section>

      <section className="tableSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Client history</p>
            <h2>Orders of this client</h2>
          </div>
        </div>

        <div className="tableWrapper">
          <table className="ordersTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Service</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {clientOrders.length > 0 ? (
                clientOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link className="tableLink" to={`/orders/${order.id}`}>
                        {order.id}
                      </Link>
                    </td>
                    <td>{order.service}</td>
                    <td>
                      <span
                        className={`statusBadge ${order.status
                          .replace(/\s+/g, "")
                          .toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`priorityBadge ${order.priority.toLowerCase()}`}
                      >
                        {order.priority}
                      </span>
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="emptyTableCell">
                    No orders for this client yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default ClientDetails;
