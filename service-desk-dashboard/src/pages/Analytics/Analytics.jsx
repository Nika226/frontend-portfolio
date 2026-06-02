import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { Link } from "react-router-dom";

function Analytics({ orders, clients }) {
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
  const mediumPriorityOrders = orders.filter(
    (order) => order.priority === "Medium",
  ).length;
  const lowPriorityOrders = orders.filter(
    (order) => order.priority === "Low",
  ).length;

  const completionRate =
    orders.length > 0 ? Math.round((completedOrders / orders.length) * 100) : 0;

  const clientOrderCounts = orders.reduce((acc, order) => {
    acc[order.client] = (acc[order.client] || 0) + 1;
    return acc;
  }, {});

  const topClients = Object.entries(clientOrderCounts)
    .map(([clientName, count]) => {
      const client = clients.find((item) => item.company === clientName);

      return {
        id: client?.id,
        client: clientName,
        count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

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
            <span>Completion rate</span>
            <strong>{completionRate}%</strong>
          </div>

          <div>
            <span>Active orders</span>
            <strong>{orders.length - completedOrders}</strong>
          </div>
        </div>
      </section>

      <section className="analyticsPanel">
        <div>
          <p className="eyebrow">Status breakdown</p>
          <h2>Orders by status</h2>
        </div>

        <div className="metricBars">
          <div className="metricRow">
            <span>Open</span>
            <div className="metricTrack">
              <div
                className="metricFill"
                style={{
                  width: `${orders.length ? (openOrders / orders.length) * 100 : 0}%`,
                }}
              />
            </div>
            <strong>{openOrders}</strong>
          </div>

          <div className="metricRow">
            <span>In Progress</span>
            <div className="metricTrack">
              <div
                className="metricFill"
                style={{
                  width: `${orders.length ? (inProgressOrders / orders.length) * 100 : 0}%`,
                }}
              />
            </div>
            <strong>{inProgressOrders}</strong>
          </div>

          <div className="metricRow">
            <span>Completed</span>
            <div className="metricTrack">
              <div
                className="metricFill"
                style={{
                  width: `${orders.length ? (completedOrders / orders.length) * 100 : 0}%`,
                }}
              />
            </div>
            <strong>{completedOrders}</strong>
          </div>
        </div>
      </section>

      <section className="analyticsPanel">
        <div>
          <p className="eyebrow">Priority distribution</p>
          <h2>Orders by priority</h2>
        </div>

        <div className="analyticsList">
          <div>
            <span>High</span>
            <strong>{highPriorityOrders}</strong>
          </div>

          <div>
            <span>Medium</span>
            <strong>{mediumPriorityOrders}</strong>
          </div>

          <div>
            <span>Low</span>
            <strong>{lowPriorityOrders}</strong>
          </div>
        </div>
      </section>

      <section className="analyticsPanel">
        <div>
          <p className="eyebrow">Client activity</p>
          <h2>Top clients by orders</h2>
        </div>

        <div className="topClientsList">
          {topClients.length > 0 ? (
            topClients.map((item) =>
              item.id ? (
                <Link
                  key={item.client}
                  className="topClientItem topClientLink"
                  to={`/clients/${item.id}`}
                >
                  <span>{item.client}</span>
                  <strong>{item.count} orders</strong>
                </Link>
              ) : (
                <div key={item.client} className="topClientItem">
                  <span>{item.client}</span>
                  <strong>{item.count} orders</strong>
                </div>
              ),
            )
          ) : (
            <p>No client activity yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Analytics;
