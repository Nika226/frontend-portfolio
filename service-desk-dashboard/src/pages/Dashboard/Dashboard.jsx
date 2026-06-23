import Header from "../../components/Header/Header";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import ActivityTimeline from "../../components/ActivityTimeline/ActivityTimeline";
import DashboardNotifications from "../../components/DashboardNotifications/DashboardNotifications";
import SmartRecommendations from "../../components/SmartRecommendations/SmartRecommendations";
function Dashboard({ orders, activityLog, onResetDemoData, resetMessage }) {
  const openOrders = orders.filter((order) => order.status === "Open").length;
  const inProgressOrders = orders.filter(
    (order) => order.status === "In Progress",
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  return (
    <main className="mainContent">
      <Header />
      <section className="demoActions">
        <button className="secondaryBtn" onClick={onResetDemoData}>
          Reset demo data
        </button>

        {resetMessage && (
          <span className="resetSuccessMessage">
            Demo data restored successfully
          </span>
        )}
      </section>
      <section className="dashboardGrid">
        <DashboardCard title="All Orders" value={orders.length} />
        <DashboardCard title="Open Orders" value={openOrders} />
        <DashboardCard title="In Progress" value={inProgressOrders} />
        <DashboardCard title="Completed" value={completedOrders} />
      </section>
      <SmartRecommendations orders={orders} />
      <DashboardNotifications activities={activityLog} />
      <ActivityTimeline activities={activityLog} />

      <OrdersTable orders={orders} />
    </main>
  );
}

export default Dashboard;
