import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Counter from "./components/Counter";
import PostList from "./components/PostList";
import ShoppingCart from "./components/ShoppingCart";
import ProductManagement from "./components/ProductManagement";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Redux Thunk & Counter App</h1>

        <div className="flex gap-4 mb-6">
          <Link
            to="/counter"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Counter
          </Link>
          <Link
            to="/posts"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Posts
          </Link>
          <Link
            to="/shopping-cart"
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Shopping Cart
          </Link>
          <Link
            to="/product-management"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Product Management
          </Link>
        </div>

        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="*" element={<Counter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
