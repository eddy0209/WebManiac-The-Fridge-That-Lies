import { useState } from "react";
import { motion } from "framer-motion";
import "./RestockModal.css";

export default function RestockModal({
    item,
    onClose,
    onConfirm,
}) {
    const [quantity, setQuantity] = useState(item.quantity);

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="modal-card"
                initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.25
                }}
            >

                <div className="modal-header">
                    <h2>Restock Item</h2>
                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <p className="modal-item-name">
                        {item.name}
                    </p>

                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Number(e.target.value))
                        }
                        className="modal-input"
                    />
                </div>

                <div className="modal-footer">
                    <button
                        className="btn btn-ghost"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            onConfirm(item.id, quantity)
                        }
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}