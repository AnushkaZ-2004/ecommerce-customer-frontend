import React from "react";
import { useCartContext } from "../../context/CartContext";
import { formatCurrency } from "../../utils/helpers";

const CartSummary = ({ showCheckoutButton = true }) => {
  const { cartItems, total } = useCartContext();

  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>

      <div className="summary-line">
        <span>Subtotal ({cartItems.length} items):</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className="summary-line">
        <span>Shipping:</span>
        <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
      </div>

      <div className="summary-line">
        <span>Tax:</span>
        <span>{formatCurrency(tax)}</span>
      </div>

      <div className="summary-line total">
        <span>
          <strong>Total:</strong>
        </span>
        <span>
          <strong>{formatCurrency(finalTotal)}</strong>
        </span>
      </div>

      {subtotal < 100 && (
        <p className="free-shipping-notice">
          Add {formatCurrency(100 - subtotal)} more for free shipping!
        </p>
      )}
    </div>
  );
};

export default CartSummary;
