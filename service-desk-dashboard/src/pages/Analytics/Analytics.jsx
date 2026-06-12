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

  const getOrderHealth = (order) => {
    if (order.status === "Completed") {
      return "Completed";
    }

    if (!order.dueDate) {
      return "No due date";
    }

    const today = new Date();
    const dueDate = new Date(order.dueDate);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return "Overdue";
    }

    if (diffDays <= 3) {
      return "Due Soon";
    }

    return "On Track";
  };

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

  const clientHealth = clients.map((client) => {
    const clientOrders = orders.filter(
      (order) => order.client === client.company,
    );

    const overdueOrders = clientOrders.filter(
      (order) => getOrderHealth(order) === "Overdue",
    ).length;

    const dueSoonOrders = clientOrders.filter(
      (order) => getOrderHealth(order) === "Due Soon",
    ).length;

    const activeOrders = clientOrders.filter(
      (order) => order.status !== "Completed",
    ).length;

    let healthStatus = "Excellent";

    if (overdueOrders >= 2) {
      healthStatus = "Critical";
    } else if (overdueOrders === 1) {
      healthStatus = "Attention Needed";
    } else if (dueSoonOrders >= 1 || activeOrders >= 3) {
      healthStatus = "Good";
    }

    return {
      id: client.id,
      company: client.company,
      healthStatus,
      activeOrders,
      overdueOrders,
      dueSoonOrders,
    };
  });

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

        <div className="metricBars">
          <div className="metricRow">
            <span>High</span>
            <div className="metricTrack">
              <div
                className="metricFill"
                style={{
                  width: `${orders.length ? (highPriorityOrders / orders.length) * 100 : 0}%`,
                }}
              />
            </div>
            <strong>{highPriorityOrders}</strong>
          </div>

          <div className="metricRow">
            <span>Medium</span>
            <div className="metricTrack">
              <div
                className="metricFill"
                style={{
                  width: `${orders.length ? (mediumPriorityOrders / orders.length) * 100 : 0}%`,
                }}
              />
            </div>
            <strong>{mediumPriorityOrders}</strong>
          </div>

          <div className="metricRow">
            <span>Low</span>
            <div className="metricTrack">
              <div
                className="metricFill"
                style={{
                  width: `${orders.length ? (lowPriorityOrders / orders.length) * 100 : 0}%`,
                }}
              />
            </div>
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

      <section className="analyticsPanel">
        <div>
          <p className="eyebrow">Client health</p>
          <h2>Client risk overview</h2>
        </div>

        <div className="topClientsList">
          {clientHealth.map((client) => (
            <Link
              key={client.id}
              className="topClientItem topClientLink"
              to={`/clients/${client.id}`}
            >
              <span>{client.company}</span>

              <strong
                className={`clientHealthBadge ${client.healthStatus
                  .replace(/\s+/g, "")
                  .toLowerCase()}`}
              >
                {client.healthStatus}
              </strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Analytics;
