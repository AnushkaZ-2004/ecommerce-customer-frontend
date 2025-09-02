export const API_BASE_URL = "http://localhost:8080/api";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product/:id",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT: "/account",
  ORDER_CONFIRMATION: "/order-confirmation/:orderId",
};

export const ORDER_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
};

export const CATEGORIES = [
  "All Categories",
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Beauty",
  "Automotive",
];
