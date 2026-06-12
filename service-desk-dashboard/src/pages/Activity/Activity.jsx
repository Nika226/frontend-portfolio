import { Link } from "react-router-dom";

function Activity({ activityLog }) {
  return (
    <main className="mainContent">
      <header className="header">
        <div>
          <p className="eyebrow">CRM history</p>
          <h1>Activity</h1>
        </div>
      </header>

      <section className="activityPagePanel">
        <div>
          <p className="eyebrow">System log</p>
          <h2>All activity records</h2>
        </div>

        <div className="activityPageList">
          {activityLog.length > 0 ? (
            activityLog.map((activity) =>
              activity.link ? (
                <Link
                  key={activity.id}
                  className="activityPageItem"
                  to={activity.link}
                >
                  <div>
                    <strong>{activity.message}</strong>
                    <span>{activity.type}</span>
                  </div>

                  <time>
                    {activity.date} · {activity.time}
                  </time>
                </Link>
              ) : (
                <div key={activity.id} className="activityPageItem">
                  <div>
                    <strong>{activity.message}</strong>
                    <span>{activity.type}</span>
                  </div>

                  <time>
                    {activity.date} · {activity.time}
                  </time>
                </div>
              ),
            )
          ) : (
            <p className="emptyNotes">No activity records yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Activity;
