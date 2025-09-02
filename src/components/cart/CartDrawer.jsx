import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../../utils/helpers";

const CartDrawer = () => {
  const { cartItems, isOpen, closeCart, total } = useCartContext();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart}></div>
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={closeCart}>
            ×
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link
                to="/products"
                className="continue-shopping"
                onClick={closeCart}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: {formatCurrency(total)}</strong>
                </div>
                <div className="cart-actions">
                  <Link
                    to="/cart"
                    className="view-cart-btn"
                    onClick={closeCart}
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    className="checkout-btn"
                    onClick={closeCart}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
