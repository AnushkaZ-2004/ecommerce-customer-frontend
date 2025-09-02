import React from "react";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { ORDER_STATUS } from "../../utils/constants";

const OrderHistory = ({ orders, loading }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case ORDER_STATUS.DELIVERED:
        return "success";
      case ORDER_STATUS.SHIPPED:
        return "info";
      case ORDER_STATUS.PROCESSING:
        return "warning";
      case ORDER_STATUS.CANCELLED:
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return <div className="loading-orders">Loading order history...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h3>No orders yet</h3>
        <p>
          You haven't placed any orders yet. Start shopping to see your order
          history here.
        </p>
      </div>
    );
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order {order.orderId}</h3>
                <p>Placed on {formatDate(order.createdAt)}</p>
              </div>
              <div className="order-status">
                <span
                  className={`status-badge ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items &&
                order.items.map((item, index) => (
                  <div key={index} className="order-item-summary">
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                ))}
            </div>

            <div className="order-total">
              <strong>Total: {formatCurrency(order.totalAmount)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
