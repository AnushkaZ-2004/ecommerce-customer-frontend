import api from "./api";
import { generateOrderId } from "../utils/helpers";

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      // Mock order creation for demonstration
      const mockOrder = {
        id: Math.floor(Math.random() * 10000) + 1,
        orderId: generateOrderId(),
        ...orderData,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };
      return mockOrder;
    }
  },

  getOrderHistory: async (customerId) => {
    try {
      const response = await api.get(`/orders/customer/${customerId}`);
      return response.data;
    } catch (error) {
      // Return mock order history
      return [
        {
          id: 1,
          orderId: "ORD-2024-001",
          totalAmount: 299.99,
          status: "DELIVERED",
          createdAt: "2024-01-15T10:30:00Z",
          items: [{ name: "iPhone 14 Pro", quantity: 1, price: 299.99 }],
        },
      ];
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      // Return mock order details
      return {
        id: orderId,
        orderId: `ORD-2024-${orderId}`,
        totalAmount: 299.99,
        status: "PROCESSING",
        createdAt: new Date().toISOString(),
        items: [],
        shippingAddress: "123 Main St, City, State 12345",
      };
    }
  },
};
