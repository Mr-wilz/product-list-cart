// useCart.tsx
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { type CartContextType } from "../types";

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// This hook provides access to the cart context, allowing components to interact with the cart state and actions.