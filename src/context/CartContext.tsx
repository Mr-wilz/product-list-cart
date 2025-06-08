import { createContext } from "react";
import {
  type Cart,
  type CartContextType,
  type CartItem,
  type Dessert,
} from "../types";
import { v4 as uuidv4 } from "uuid";


// Define the default cart
export const defaultCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Utility function to recalculate cart totals
export const recalcCart = (items: CartItem[]): Cart => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { items, totalItems, totalPrice };
};

// Utility function to add an item to the cart
export const addToCartLogic = (prev: Cart, dessert: Dessert): Cart => {
  const existingIndex = prev.items.findIndex(
    (item) => item.name === dessert.name
  );
  let newItems;
  if (existingIndex !== -1) {
    newItems = [...prev.items];
    newItems[existingIndex] = {
      ...newItems[existingIndex],
      quantity: newItems[existingIndex].quantity + 1,
    };
  } else {
    const newItem: CartItem = { ...dessert, id: uuidv4(), quantity: 1 };
    newItems = [...prev.items, newItem];
  }
  return recalcCart(newItems);
};

// Utility function to remove an item from the cart
export const removeFromCartLogic = (prev: Cart, id: string): Cart => {
  const filteredItems = prev.items.filter((item) => item.id !== id);

  return recalcCart(filteredItems);
};

// Utility function to decrease item quantity
export const decreaseQuantityLogic = (prev: Cart, id: string): Cart => {
  const existingItem = prev.items.find((item) => item.id === id);
  
  if (!existingItem) return prev;
  
  if (existingItem.quantity === 1) {
    // Remove if quantity would become 0
    return removeFromCartLogic(prev, id);
  } else {
    // Decrease quantity by 1
    return updateQuantityLogic(prev, id, existingItem.quantity - 1);
  }
};

// Utility function to update item quantity
export const updateQuantityLogic = (
  prev: Cart,
  id: string,
  quantity: number
): Cart => {
  if (quantity <= 0) {
    const filtered = prev.items.filter((item) => item.id !== id);
    return recalcCart(filtered);
  }
  const updatedItems = prev.items.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  return recalcCart(updatedItems);
};
