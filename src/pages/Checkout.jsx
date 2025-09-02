import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import Loading from "../components/common/Loading";

const Checkout = () => {
  const { cartItems, total, clearCart } = useCartContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleOrderSubmit = async (orderData) => {
    setLoading(true);
    setError("");

    try {
      const orderPayload = {
        customerId: user?.id || 1,
        customerName: `${orderData.firstName} ${orderData.lastName}`,
        customerEmail: orderData.email,
        shippingAddress: `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zipCode}`,
        paymentMethod: orderData.paymentMethod,
        totalAmount: total + (total > 100 ? 0 : 9.99) + total * 0.08,
        orderItems: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
      };

      const order = await orderService.createOrder(orderPayload);
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      setError("Failed to place order. Please try again.");
      console.error("Order creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Processing your order..." />;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="checkout-content">
          <div className="checkout-form-section">
            <CheckoutForm onSubmit={handleOrderSubmit} user={user} />
          </div>

          <div className="checkout-summary-section">
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
