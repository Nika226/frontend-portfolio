import { Link } from "react-router-dom";

function SmartRecommendations({ orders }) {
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

  const overdueOrders = orders.filter(
    (order) => getOrderHealth(order) === "Overdue",
  );

  const dueSoonOrders = orders.filter(
    (order) => getOrderHealth(order) === "Due Soon",
  );

  const highPriorityOpenOrders = orders.filter(
    (order) => order.priority === "High" && order.status !== "Completed",
  );

  const recommendations = [];

  if (overdueOrders.length > 0) {
    recommendations.push({
      id: "overdue-orders",
      icon: "🔴",
      title: `${overdueOrders.length} overdue order${overdueOrders.length > 1 ? "s" : ""} detected`,
      text: "Review overdue service requests and update their status or deadline.",
      link: `/orders/${overdueOrders[0].id}`,
      type: "Critical",
    });
  }

  if (highPriorityOpenOrders.length > 0) {
    recommendations.push({
      id: "high-priority",
      icon: "⚠️",
      title: `${highPriorityOpenOrders.length} high priority order${
        highPriorityOpenOrders.length > 1 ? "s" : ""
      } require attention`,
      text: "Focus on high priority work before lower-risk service requests.",
      link: `/orders/${highPriorityOpenOrders[0].id}`,
      type: "Priority",
    });
  }

  if (dueSoonOrders.length > 0) {
    recommendations.push({
      id: "due-soon",
      icon: "⏳",
      title: `${dueSoonOrders.length} order${dueSoonOrders.length > 1 ? "s" : ""} due soon`,
      text: "Plan upcoming work to avoid new overdue cases.",
      link: `/orders/${dueSoonOrders[0].id}`,
      type: "Upcoming",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "all-clear",
      icon: "✅",
      title: "All critical orders are under control",
      text: "No overdue or urgent high-priority service requests detected.",
      link: "",
      type: "Stable",
    });
  }

  return (
    <section className="recommendationsPanel">
      <div>
        <p className="eyebrow">Smart insights</p>
        <h2>Smart recommendations</h2>
      </div>

      <div className="recommendationsList">
        {recommendations.map((item) =>
          item.link ? (
            <Link key={item.id} className="recommendationItem" to={item.link}>
              <span className="recommendationIcon">{item.icon}</span>

              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>

              <small className={item.type.toLowerCase()}>{item.type}</small>
            </Link>
          ) : (
            <div key={item.id} className="recommendationItem">
              <span className="recommendationIcon">{item.icon}</span>

              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>

              <small>{item.type}</small>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export default SmartRecommendations;
