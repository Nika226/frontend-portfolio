function DashboardCard({ title, value }) {
  return (
    <div className="statCard">
      <p>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

export default DashboardCard;
