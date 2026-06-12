import { Link } from "react-router-dom";

function DashboardNotifications({ activities }) {
  const notifications = activities.slice(0, 3);

  return (
    <section className="notificationsPanel">
      <div>
        <p className="eyebrow">System updates</p>
        <h2>Dashboard notifications</h2>
      </div>

      <div className="notificationsList">
        {notifications.length > 0 ? (
          notifications.map((activity) =>
            activity.link ? (
              <Link
                key={activity.id}
                className="notificationItem"
                to={activity.link}
              >
                <span>🔔</span>
                <div>
                  <strong>{activity.message}</strong>
                  <p>
                    {activity.date} · {activity.time}
                  </p>
                </div>
              </Link>
            ) : (
              <div key={activity.id} className="notificationItem">
                <span>🔔</span>
                <div>
                  <strong>{activity.message}</strong>
                  <p>
                    {activity.date} · {activity.time}
                  </p>
                </div>
              </div>
            ),
          )
        ) : (
          <p className="emptyNotes">No notifications yet.</p>
        )}
      </div>
    </section>
  );
}

export default DashboardNotifications;
