import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { applyOffers } from "../utils/applyOffers";
import { products } from "../data/productData";
import { addItem, removeItem } from "../store/Slice/cartSlice";

export default function Basket() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = Object.entries(items).reduce((sum, [id, qty]) => {
    const price = products.find((p) => p.id === id)?.price || 0;
    return sum + price * qty;
  }, 0);

  const { savings, totalSavings } = applyOffers(items, products);

  return (
    <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">🧺 Basket</h2>

      <div className="space-y-4">
        {Object.keys(items).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">🛒 Basket is empty</p>
            <p className="text-sm mt-1">Add products to see them here</p>
          </div>
        ) : (
          Object.entries(items).map(([id, qty]) => {
            const product = products.find((p) => p.id === id)!;

            return (
              <div
                key={id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    £{product.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(removeItem(id))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>

                  <span className="font-medium">{qty}</span>

                  <button
                    onClick={() => dispatch(addItem(id))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>

        {savings.map((s, i) => (
          <div key={i} className="flex justify-between text-sm text-green-600">
            <span>{s.description}</span>
            <span>-£{s.amount.toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between text-lg font-semibold mt-4">
          <span>Total</span>
          <span>£{(subtotal - totalSavings).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
