export const cartService = {
  getCart: () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  },

  addToCart: (product, quantity = 1) => {
    const cart = cartService.getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity,
        maxStock: product.stockQuantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },

  updateQuantity: (productId, quantity) => {
    const cart = cartService.getCart();
    const item = cart.find((item) => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        return cartService.removeFromCart(productId);
      } else {
        item.quantity = Math.min(quantity, item.maxStock);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    return cart;
  },

  removeFromCart: (productId) => {
    const cart = cartService.getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    return [];
  },

  getCartTotal: () => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getCartItemCount: () => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
};
