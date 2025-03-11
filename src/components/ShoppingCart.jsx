import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const checkout = () => {
    alert("Checkout successful!");
    setCart([]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} checkout={checkout} />
    </div>
  );
};

export default ShoppingCart;
