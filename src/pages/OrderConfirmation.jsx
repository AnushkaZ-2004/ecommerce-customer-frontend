import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { orderService } from "../services/orderService";
import { formatCurrency, formatDate } from "../utils/helpers";
import Loading from "../components/common/Loading";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const orderData = await orderService.getOrderById(orderId);
      setOrder(orderData);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading order details..." />;
  }

  if (!order) {
    return (
      <div className="container">
        <div className="order-not-found">
          <h2>Order Not Found</h2>
          <p>We couldn't find the order you're looking for.</p>
          <Link to="/" className="home-link">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Order Confirmed!</h1>
          <p>
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </div>

        <div className="order-details">
          <div className="order-info">
            <h2>Order Details</h2>
            <div className="order-meta">
              <div className="meta-item">
                <strong>Order Number:</strong> {order.orderId || `#${order.id}`}
              </div>
              <div className="meta-item">
                <strong>Order Date:</strong> {formatDate(order.createdAt)}
              </div>
              <div className="meta-item">
                <strong>Status:</strong>
                <span className="order-status">{order.status}</span>
              </div>
              {order.estimatedDelivery && (
                <div className="meta-item">
                  <strong>Estimated Delivery:</strong>{" "}
                  {formatDate(order.estimatedDelivery)}
                </div>
              )}
            </div>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="order-items">
              <h3>Items Ordered</h3>
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                  <span className="item-price">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="order-total">
            <strong>Total: {formatCurrency(order.totalAmount)}</strong>
          </div>

          {order.shippingAddress && (
            <div className="shipping-info">
              <h3>Shipping Address</h3>
              <p>{order.shippingAddress}</p>
            </div>
          )}
        </div>

        <div className="confirmation-actions">
          <Link to="/account" className="account-link">
            View Order History
          </Link>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
