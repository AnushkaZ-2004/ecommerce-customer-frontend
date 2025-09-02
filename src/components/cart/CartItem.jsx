import React from "react";
import { useCartContext } from "../../context/CartContext";
import { formatCurrency } from "../../utils/helpers";

const CartItem = ({ item, showRemove = true }) => {
  const { updateQuantity, removeFromCart } = useCartContext();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, Math.min(newQuantity, item.maxStock));
    }
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.imageUrl || "/placeholder.jpg"} alt={item.name} />
      </div>

      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        <p className="item-price">{formatCurrency(item.price)}</p>

        <div className="item-controls">
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </button>
            <span className="quantity">{item.quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.maxStock}
            >
              +
            </button>
          </div>

          {showRemove && (
            <button
              className="remove-item"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          )}
        </div>

        <div className="item-total">
          Subtotal: {formatCurrency(item.price * item.quantity)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
