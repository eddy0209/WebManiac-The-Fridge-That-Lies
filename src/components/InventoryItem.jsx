import "./InventoryItem.css";

export default function InventoryItem({ item, onConsume, onRestock }) {
  const isEmpty = item.quantity === 0;
  const isLow   = item.quantity === 1;

  const barColor = isEmpty ? "var(--red)" : isLow ? "var(--amber)" : "var(--green)";
  const barWidth = `${Math.min(item.quantity * 10, 100)}%`;

  return (
    <div className="inv-item">
      <div className="inv-item__info">
        <div className="inv-item__top">
          <h3 className="inv-item__name">{item.name}</h3>
          {isLow && (
            <span className="badge badge-amber">⚠ Last One</span>
          )}
          {isEmpty && (
            <span className="badge badge-red">🚫 Empty</span>
          )}
        </div>

        <div className="inv-item__qty-row">
          <span className="inv-item__qty-tag">Qty</span>
          <span className="inv-item__qty-num">{item.quantity}</span>
          <div className="inv-item__bar">
            <div
              className="inv-item__bar-fill"
              style={{ width: barWidth, background: barColor }}
            />
          </div>
        </div>
      </div>

      <div className="inv-item__actions">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => onConsume(item.id)}
          title="Consume one unit"
        >
          − Consume
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onRestock(item.id)}
          title="Restock this item"
        >
          ↺ Restock
        </button>
      </div>
    </div>
  );
}