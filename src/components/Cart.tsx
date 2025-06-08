import CartItem from "./CartItem";
import { useCart } from "../context/useCart";
import { useState } from "react"; // Removed useNavigate
import OrderSummary from "../pages/OrderSummary";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handleConfirmOrder = () => {
    setShowOrderSummary(true);
  };

  const handleCloseOrderSummary = () => {
    setShowOrderSummary(false);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-md space-y-6 w-full sm:min-w-[400px]"
      id="cart"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-orange-700">
        Your Cart ({cart.totalItems})
      </h2>

      {cart.totalItems === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <img
            src="/images/illustration-empty-cart.svg"
            alt="Empty cart illustration"
            className="w-32 sm:w-40 h-auto"
          />
          <p className="text-gray-900 text-center text-sm sm:text-base">
            Your added items will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <hr className="" />

          <div className="flex justify-between text-base sm:text-lg font-semibold">
            <span>Order Total</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>

          <div
            className="bg-rose-50 text-sm text-gray-600 p-3 rounded-md text-center items-center justify-center flex gap-1"
          
          >
            <img
              src="/images/icon-carbon-neutral.svg"
              alt=""
              className="px-2"
            />{" "}
            This is a <span className="font-semibold">carbon-neutral</span>{" "}
            delivery
          </div>
        

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg w-full sm:w-1/2"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-lg w-full sm:w-1/2 "
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}

      {showOrderSummary && <OrderSummary onClose={handleCloseOrderSummary} />}
    </div>
  );
};

export default Cart;
