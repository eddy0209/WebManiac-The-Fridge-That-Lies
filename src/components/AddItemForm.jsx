import { useState } from "react";
import "./AddItemForm.css";

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity) return;
    onAdd(name, Number(quantity));
    setName("");
    setQuantity("");
  };

  return (
    <div className="add-form glass">
      <div className="add-form__header">
        <span className="add-form__icon">➕</span>
        <h2 className="add-form__title">Add Grocery Item</h2>
      </div>
      <div className="add-form__divider" />

      <form onSubmit={handleSubmit} className="add-form__fields">
        <div className="field-group">
          <label className="field-label" htmlFor="item-name">Item Name</label>
          <input
            id="item-name"
            type="text"
            placeholder="e.g. Almond Milk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="item-quantity">Quantity</label>
          <input
            id="item-quantity"
            type="number"
            placeholder="e.g. 3"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="field-input"
            min="0"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <span>Add to Fridge</span>
          <span className="btn-arrow">→</span>
        </button>
      </form>
    </div>
  );
}