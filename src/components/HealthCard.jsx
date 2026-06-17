import "./HealthCard.css";

export default function HealthCard({ items }) {
  /* ── Logic unchanged ── */
  const healthyItems = items.filter((item) => item.quantity > 1).length;
  const health = items.length === 0
    ? 100
    : Math.round((healthyItems / items.length) * 100);

  let status      = "Healthy";
  let stateClass  = "hcard--good";
  let barColor    = "var(--green)";
  let barGlow     = "rgba(52,211,153,0.55)";

  if (health < 75) {
    status     = "Running Low";
    stateClass = "hcard--warning";
    barColor   = "var(--amber)";
    barGlow    = "rgba(251,191,36,0.5)";
  }
  if (health < 40) {
    status     = "Critical";
    stateClass = "hcard--critical";
    barColor   = "var(--red)";
    barGlow    = "rgba(248,113,113,0.55)";
  }

  const lowCount   = items.filter((i) => i.quantity === 1).length;
  const emptyCount = items.filter((i) => i.quantity === 0).length;

  return (
    <div className={`hcard ${stateClass}`}>
      {/* Header */}
      <div className="hcard__head">
        <div className="hcard__title-group">
          <span className="hcard__icon">💚</span>
          <h2 className="hcard__title">Inventory Health</h2>
        </div>
        <div className="hcard__score">
          <span className="hcard__pct">{health}%</span>
          <span className="hcard__status-label">{status}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="hcard__bar-wrap">
        <div className="hcard__bar-track">
          <div
            className="hcard__bar-fill"
            style={{
              width: `${health}%`,
              background: barColor,
              boxShadow: `0 0 14px ${barGlow}`,
            }}
          />
        </div>
        <div className="hcard__bar-ticks">
          <span className="hcard__bar-tick">0%</span>
          <span className="hcard__bar-tick">50%</span>
          <span className="hcard__bar-tick">100%</span>
        </div>
      </div>

      <p className="hcard__legend">
        {items.length === 0
          ? "Add items to track your fridge health"
          : `${healthyItems} of ${items.length} items well-stocked`}
      </p>

      {/* Breakdown */}
      {items.length > 0 && (
        <div className="hcard__breakdown">
          <div className="hcard__row">
            <span className="hcard__row-label">
              <span className="hcard__row-dot" style={{ background: "var(--green)" }} />
              Healthy
            </span>
            <span className="hcard__row-val">{healthyItems}</span>
          </div>
          <div className="hcard__row">
            <span className="hcard__row-label">
              <span className="hcard__row-dot" style={{ background: "var(--amber)" }} />
              Low Stock
            </span>
            <span className="hcard__row-val">{lowCount}</span>
          </div>
          <div className="hcard__row">
            <span className="hcard__row-label">
              <span className="hcard__row-dot" style={{ background: "var(--red)" }} />
              Empty
            </span>
            <span className="hcard__row-val">{emptyCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}