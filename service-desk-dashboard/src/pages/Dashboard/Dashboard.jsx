import Header from "../../components/Header/Header";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import ActivityTimeline from "../../components/ActivityTimeline/ActivityTimeline";

function Dashboard({ orders, activityLog, onResetDemoData }) {
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

      <section className="dashboardGrid">
        <DashboardCard title="All Orders" value={orders.length} />
        <DashboardCard title="Open Orders" value={openOrders} />
        <DashboardCard title="In Progress" value={inProgressOrders} />
        <DashboardCard title="Completed" value={completedOrders} />
      </section>
      <ActivityTimeline activities={activityLog} />
      <section className="demoActions">
        <button className="secondaryBtn" onClick={onResetDemoData}>
          Reset demo data
        </button>
      </section>

      <OrdersTable orders={orders} />
    </main>
  );
}

export default Dashboard;
