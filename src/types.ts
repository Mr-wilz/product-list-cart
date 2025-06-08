// types.ts
export type Dessert = {
  name: string;
  category: string;
  price: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
};

export type CartItem = Dessert & {
  id: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

export type CartContextType = {
  cart: Cart;
  addToCart: (dessert: Dessert) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (name: string) => number; // Add this
};
