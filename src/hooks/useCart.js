import { useState, useEffect } from "react";
import { cartService } from "../services/cartService";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCartItems(cartService.getCart());
  }, []);

  const addToCart = (product, quantity = 1) => {
    const updatedCart = cartService.addToCart(product, quantity);
    setCartItems(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cartService.updateQuantity(productId, quantity);
    setCartItems(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartService.removeFromCart(productId);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    const updatedCart = cartService.clearCart();
    setCartItems(updatedCart);
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  return {
    cartItems,
    isOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleCart,
    closeCart,
    openCart,
    itemCount: cartService.getCartItemCount(),
    total: cartService.getCartTotal(),
  };
};
