import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ onClose }: { onClose: () => void }) => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleStartNewOrder = () => {
    clearCart();
    navigate("/");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-xl shadow-md p-6 w-[100vw] lg:w-[50vw] max-h-[90vh] flex flex-col">
        {/* Header - fixed at top */}
        <div className="flex flex-col mb-4">
          <div className="text-2xl">
            <img src="/images/icon-order-confirmed.svg" alt="" />
          </div>
          <h2 className="text-3xl font-bold text-orange-950">
            Order Confirmed
          </h2>
          <p className="text-orange-950 font-redhat text-sm">
            We hope you enjoy your food!
          </p>
        </div>

        {/* Scrollable items section */}
        <div className="overflow-y-auto flex-grow space-y-3 pr-2 -mr-2">
          {cart.totalItems > 0 && (
            <div className="space-y-2">
              {cart.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-rose-50 p-2 rounded-md flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        item.image?.thumbnail || "/images/default-dessert.jpg"
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm text-orange-950 font-extrabold">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold flex gap-4">
                          <span className="text-orange-600 font-bold text-lg">
                            {item.quantity}x
                          </span>
                          <span className="text-lg text-gray-400">
                            @${item.price.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Order Total - stays above footer */}
          <div className="flex justify-between pt-4">
            <div className="flex">
              <p className="font-semibold text-lg">Order Total</p>
            </div>
            <div className="flex font-semibold">
              ${cart.totalPrice.toFixed(2)}
            </div>
          </div>

          {/* Carbon neutral notice */}
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
        </div>

        {/* Footer - fixed at bottom */}
        <button
          onClick={handleStartNewOrder}
          className="bg-orange-700 hover:bg-orange-600 text-white px-6 py-2 rounded-full w-full mt-4"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
