import "./App.css";

// Components
import ProductList from "./components/ProductList";
import Basket from "./components/Basket";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🛒 Shopping Cart
        </h1>

        <div className="flex flex-col md:flex-row items-start gap-6">
          <ProductList />
          <Basket />
        </div>
      </div>
    </div>
  );
}

export default App;
