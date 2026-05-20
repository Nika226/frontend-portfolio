import DashboardCard from "../../components/DashboardCard/DashboardCard";

import { mockClients } from "../../data/mockClients";

function Analytics({ orders }) {
  const openOrders = orders.filter((order) => order.status === "Open").length;
  const inProgressOrders = orders.filter(
    (order) => order.status === "In Progress",
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;
  const highPriorityOrders = orders.filter(
    (order) => order.priority === "High",
  ).length;

  return (
    <main className="mainContent">
      <header className="header">
        <div>
          <p className="eyebrow">Operational insights</p>
          <h1>Analytics</h1>
        </div>
      </header>

      <section className="dashboardGrid">
        <DashboardCard title="Open Orders" value={openOrders} />
        <DashboardCard title="In Progress" value={inProgressOrders} />
        <DashboardCard title="Completed" value={completedOrders} />
        <DashboardCard title="High Priority" value={highPriorityOrders} />
      </section>

      <section className="analyticsPanel">
        <div>
          <p className="eyebrow">Summary</p>
          <h2>Service performance overview</h2>
        </div>

        <div className="analyticsList">
          <div>
            <span>Total orders</span>
            <strong>{orders.length}</strong>
          </div>

          <div>
            <span>Total clients</span>
            <strong>{mockClients.length}</strong>
          </div>

          <div>
            <span>Completion rate</span>
            <strong>
              {Math.round((completedOrders / orders.length) * 100)}%
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Analytics;
