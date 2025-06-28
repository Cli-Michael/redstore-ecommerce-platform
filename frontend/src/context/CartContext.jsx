// context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartCount(response.data.items.length || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const addToCart = async (productId) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    try {
      await axios.post(`http://localhost:5000/api/cart/${userId}`, { productId });
      fetchCartCount(); // Update cart count after adding
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      fetchCartCount(); // Update cart count after removal
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  useEffect(() => {
    fetchCartCount(); // Fetch cart count on mount
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
