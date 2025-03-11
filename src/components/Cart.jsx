import React from "react";

const Cart = ({ cart, checkout }) => {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-3">Cart</h2>
      <ul className="space-y-2">
        {cart.map((item, index) => (
          <li key={index} className="p-2 border-b">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={checkout}
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
