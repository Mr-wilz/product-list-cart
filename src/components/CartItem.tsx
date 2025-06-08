import { type CartItem as CartItemType } from "../types";
import { useCart } from "../context/useCart";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => updateQuantity(item.id, item.quantity + 1);
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <img
        src={item.image.thumbnail}
        srcSet={`${item.image.mobile} 480w, ${item.image.tablet} 768w, ${item.image.desktop} 1024w`}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>

        <div className="flex flex-row gap-2 font-redhat text-gray-700">
          <p className="text-sm font-semibold text-orange-600">
            {item.quantity}x
          </p>
          <p className="text-sm text-gray-500 font-semibold">
            @${item.price.toFixed(2)}
          </p>
        </div>

        <p className="text-sm font-semibold text-rose-500">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-rose-200 px-2 py-1 rounded"
          onClick={handleDecrease}
        >
          –
        </button>
        <span className="min-w-[1.5rem] text-center">{item.quantity}</span>
        <button
          className="bg-rose-400 text-white px-2 py-1 rounded"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
