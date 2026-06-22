import { useState } from "react";
import { Link } from "react-router-dom";

function Activity({ activityLog }) {
  const [activityFilter, setActivityFilter] = useState("All");

  const filteredActivityLog =
    activityFilter === "All"
      ? activityLog
      : activityLog.filter((activity) => activity.type === activityFilter);

  const activityTypes = [
    "All",
    ...new Set(activityLog.map((item) => item.type)),
  ];
  const activityLabels = {
    "order-created": "Order Created",
    "order-edited": "Order Edited",
    "order-deleted": "Order Deleted",
    "status-changed": "Status Changed",
  };
  const activityIcons = {
    "order-created": "🟢",
    "order-edited": "✏️",
    "order-deleted": "🗑️",
    "status-changed": "🔄",
  };

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
          <div className="activityFilters">
            {activityTypes.map((type) => (
              <button
                key={type}
                className={
                  activityFilter === type
                    ? "activityFilter active"
                    : "activityFilter"
                }
                onClick={() => setActivityFilter(type)}
              >
                {activityLabels[type] || type}
              </button>
            ))}
          </div>
        </div>

        <div className="activityPageList">
          {filteredActivityLog.length > 0 ? (
            filteredActivityLog.map((activity) =>
              activity.link ? (
                <Link
                  key={activity.id}
                  className="activityPageItem"
                  to={activity.link}
                >
                  <div>
                    <strong>
                      {activityIcons[activity.type]} {activity.message}
                    </strong>
                    <span>
                      {activityLabels[activity.type] || activity.type}
                    </span>
                  </div>

                  <time>
                    {activity.date} · {activity.time}
                  </time>
                </Link>
              ) : (
                <div key={activity.id} className="activityPageItem">
                  <div>
                    <strong>
                      {activityIcons[activity.type]} {activity.message}
                    </strong>
                    <span>
                      {activityLabels[activity.type] || activity.type}
                    </span>
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
