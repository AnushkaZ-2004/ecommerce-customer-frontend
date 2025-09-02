import api from "./api";

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      // Return mock data if API fails
      return [
        {
          id: 1,
          name: "iPhone 14 Pro",
          description: "Latest iPhone with advanced camera system",
          price: 999.99,
          category: "Electronics",
          imageUrl: "https://via.placeholder.com/300x300?text=iPhone+14+Pro",
          stockQuantity: 50,
          active: true,
        },
        {
          id: 2,
          name: "Nike Air Max",
          description: "Comfortable running shoes for everyday wear",
          price: 129.99,
          category: "Sports",
          imageUrl: "https://via.placeholder.com/300x300?text=Nike+Air+Max",
          stockQuantity: 25,
          active: true,
        },
        {
          id: 3,
          name: "Samsung Smart TV",
          description: "55-inch 4K Ultra HD Smart TV",
          price: 799.99,
          category: "Electronics",
          imageUrl: "https://via.placeholder.com/300x300?text=Samsung+TV",
          stockQuantity: 15,
          active: true,
        },
      ];
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      // Return mock data if API fails
      return {
        id: parseInt(id),
        name: "Sample Product",
        description: "This is a sample product description",
        price: 99.99,
        category: "Electronics",
        imageUrl: "https://via.placeholder.com/400x400?text=Product+Image",
        stockQuantity: 10,
        active: true,
      };
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const products = await productService.getAllProducts();
      return products.filter(
        (product) =>
          category === "All Categories" || product.category === category
      );
    } catch (error) {
      return [];
    }
  },
};
