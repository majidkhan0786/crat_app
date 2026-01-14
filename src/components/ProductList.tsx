import { useDispatch } from "react-redux";
import { products } from "../data/productData";
import { addItem } from "../store/Slice/cartSlice";

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">🛍 Products</h2>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:shadow transition"
          >
            <div>
              <p className="font-medium text-gray-800">{p.name}</p>
              <p className="text-sm text-gray-500">£{p.price.toFixed(2)}</p>
            </div>

            <button
              onClick={() => dispatch(addItem(p.id))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
