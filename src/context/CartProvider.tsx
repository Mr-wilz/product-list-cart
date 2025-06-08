// CartProvider.tsx
import { useState, type ReactNode } from "react";
import {
  CartContext,
  defaultCart,
  addToCartLogic,
  removeFromCartLogic,
  updateQuantityLogic,
} from "./CartContext";
import { type Cart, type Dessert } from "../types";
import toast from "react-hot-toast";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(defaultCart);

  const addToCart = (dessert: Dessert) => {
    setCart((prev) => addToCartLogic(prev, dessert));
    toast.success(`${dessert.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => removeFromCartLogic(prev, id));
    toast.error("Item removed from cart!");
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) => updateQuantityLogic(prev, id, quantity));
  };

  const getItemQuantity = (name: string): number => {
    const item = cart.items.find((item) => item.name === name);
    return item ? item.quantity : 0;
  };

  const clearCart = () => setCart(defaultCart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity, // Add this to the context value
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
