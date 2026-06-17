import "./StatCard.css";

export default function StatCard({ title, value, icon, variant = "total" }) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <div className="stat-card__icon-bg">
        <span className="stat-card__icon">{icon}</span>
      </div>
      <div className="stat-card__body">
        <span className="stat-card__label">{title}</span>
        <span className="stat-card__num">{value}</span>
      </div>
    </div>
  );
}