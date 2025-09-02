import api from "./api";

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      if (response.data) {
        localStorage.setItem("customerUser", JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post("/auth/customer-login", {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("customerUser", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  logout: () => {
    localStorage.removeItem("customerUser");
    localStorage.removeItem("cart");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("customerUser") || "null");
  },

  isAuthenticated: () => {
    const user = localStorage.getItem("customerUser");
    return !!user;
  },
};
