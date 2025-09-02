import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import OrderHistory from "../components/account/OrderHistory";
import UserProfile from "../components/account/UserProfile";

const Account = () => {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "orders" && user) {
      fetchOrders();
    }
  }, [activeTab, user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const orderHistory = await orderService.getOrderHistory(user.id);
      setOrders(orderHistory);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-page">
      <div className="container">
        <h1>My Account</h1>

        <div className="account-tabs">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>
        </div>

        <div className="account-content">
          {activeTab === "profile" && <UserProfile user={user} />}
          {activeTab === "orders" && (
            <OrderHistory orders={orders} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
