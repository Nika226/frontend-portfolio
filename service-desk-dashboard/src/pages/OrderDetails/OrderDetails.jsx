import { Link, useParams } from "react-router-dom";

function OrderDetails({ orders }) {
  const { orderId } = useParams();

  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <main className="mainContent">
        <Link className="backLink" to="/orders">
          ← Back to orders
        </Link>

        <section className="detailsCard">
          <h1>Order not found</h1>
          <p>This service order does not exist.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mainContent">
      <Link className="backLink" to="/orders">
        ← Back to orders
      </Link>

      <section className="detailsCard">
        <p className="eyebrow">Service order details</p>
        <h1>{order.id}</h1>

        <div className="detailsGrid">
          <div>
            <span>Client</span>
            <strong>{order.client}</strong>
          </div>

          <div>
            <span>Service</span>
            <strong>{order.service}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{order.status}</strong>
          </div>

          <div>
            <span>Priority</span>
            <strong>{order.priority}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{order.date}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderDetails;
