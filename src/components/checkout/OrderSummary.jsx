import React from "react";
import { formatCurrency } from "../../utils/helpers";

const OrderSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="order-items">
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
            </div>
            <div className="item-price">
              {formatCurrency(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="order-totals">
        <div className="total-line">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="total-line">
          <span>Shipping:</span>
          <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
        </div>
        <div className="total-line">
          <span>Tax:</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="total-line final-total">
          <span>
            <strong>Total:</strong>
          </span>
          <span>
            <strong>{formatCurrency(total)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
