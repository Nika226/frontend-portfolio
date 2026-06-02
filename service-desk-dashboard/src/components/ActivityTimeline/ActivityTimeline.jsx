import { Link } from "react-router-dom";

function ActivityTimeline({ orders }) {
  const recentActivities = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
    .map((order) => ({
      id: order.id,
      title:
        order.status === "Completed"
          ? "Order completed"
          : order.status === "In Progress"
            ? "Order in progress"
            : "Order opened",
      description: `${order.id} · ${order.client}`,
      date: order.date,
      link: `/orders/${order.id}`,
    }));

  return (
    <section className="activityPanel">
      <div>
        <p className="eyebrow">Recent activity</p>
        <h2>Activity timeline</h2>
      </div>

      <div className="activityList">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <Link key={activity.id} className="activityItem" to={activity.link}>
              <div className="activityDot" />

              <div>
                <strong>{activity.title}</strong>
                <span>{activity.description}</span>
              </div>

              <time>{activity.date}</time>
            </Link>
          ))
        ) : (
          <p>No recent activity yet.</p>
        )}
      </div>
    </section>
  );
}

export default ActivityTimeline;
