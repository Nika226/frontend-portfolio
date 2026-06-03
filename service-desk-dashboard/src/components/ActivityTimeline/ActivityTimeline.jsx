import { Link } from "react-router-dom";

function ActivityTimeline({ activities }) {
  return (
    <section className="activityPanel">
      <div>
        <p className="eyebrow">Recent activity</p>
        <h2>Activity timeline</h2>
      </div>

      <div className="activityList">
        {activities.length > 0 ? (
          activities.slice(0, 3).map((activity) =>
            activity.link ? (
              <Link
                key={activity.id}
                className="activityItem"
                to={activity.link}
              >
                <div className="activityDot" />

                <div>
                  <strong>{activity.message}</strong>
                  <span>
                    {activity.type} · {activity.date} · {activity.time}
                  </span>
                </div>
              </Link>
            ) : (
              <div key={activity.id} className="activityItem">
                <div className="activityDot" />

                <div>
                  <strong>{activity.message}</strong>
                  <span>
                    {activity.type} · {activity.date} · {activity.time}
                  </span>
                </div>
              </div>
            ),
          )
        ) : (
          <p>No recent activity yet.</p>
        )}
      </div>
    </section>
  );
}

export default ActivityTimeline;
