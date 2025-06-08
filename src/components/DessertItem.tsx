import { type Dessert } from "../types";
import { useCart } from "../context/useCart";
import incrementIcon from "../assets/icon-increment-quantity.svg";
import decrementIcon from "../assets/icon-decrement-quantity.svg";

interface DessertItemProps {
  dessert: Dessert;
}

const DessertItem = ({ dessert }: DessertItemProps) => {
  const { addToCart, updateQuantity, getItemQuantity, cart } = useCart();
  const quantity = getItemQuantity(dessert.name);
  const cartItem = cart.items.find((item) => item.name === dessert.name);
  const itemId = cartItem?.id;

  // Debugging log (remove in production)
  console.log("Cart Item:", cartItem, "Item ID:", itemId);

  const handleDecreaseQuantity = () => {
    if (itemId) {
      updateQuantity(itemId, quantity - 1);
    } else {
      console.error("Item ID is undefined, cannot decrease quantity");
    }
  };

  return (
    <div className="relative bg-none rounded-xl p-2 sm:p-3 flex flex-col gap-2">
      <div
        className={`relative w-full aspect-[4/3] ${
          quantity > 0 ? "border sm:border-2 border-orange-700 rounded-xl" : ""
        }`}
      >
        <img
          src={dessert.image.thumbnail}
          srcSet={`${dessert.image.desktop} 1024w, ${dessert.image.tablet} 768w, ${dessert.image.mobile} 480w`}
          alt={dessert.name}
          className="w-full h-full rounded-xl object-cover transition-transform duration-300"
          loading="lazy"
        />
        {quantity === 0 ? (
          <button
            onClick={() => addToCart(dessert)}
            className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-white px-2 sm:px-3 py-1 rounded-full border-[1px] border-gray-300 text-sm sm:text-base w-32 sm:w-40 justify-evenly font-semibold"
          >
            <img src="/images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </button>
        ) : (
          <div className="absolute -bottom-2 xs:-bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 xs:gap-2 bg-orange-700 px-1 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-1 rounded-full  w-24 xs:w-28 sm:w-32 md:w-40 justify-around">
            <button
              onClick={handleDecreaseQuantity} // Updated to use the new handler
              className="w-4 xs:w-4 sm:w-6 h-5 xs:h-6 sm:h-6 rounded-full flex items-center justify-center  transition border-2 border-white"
            >
              <img src={decrementIcon} alt="Decrement" />
            </button>
            <span className="text-xs xs:text-sm sm:text-lg font-semibold text-white">
              {quantity}
            </span>
            <button
              onClick={() => addToCart(dessert)}
              className="w-4 xs:w-4 sm:w-6 h-5 xs:h-6 sm:h-6 rounded-full flex items-center justify-center transition border-2 border-white"
            >
              <img src={incrementIcon} alt="Increment" />
            </button>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs sm:text-sm text-rose-500 mt-2 font-red-hat-text">
          {dessert.category}
        </p>
        <h2 className="text-sm sm:text-lg text-rose-900 font-semibold">
          {dessert.name}
        </h2>
        <p className="text-sm sm:text-lg text-orange-700 font-bold">
          ${dessert.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default DessertItem;
