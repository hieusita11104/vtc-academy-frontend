import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const Cart: React.FC<{ cart: Product[]; checkout: () => void }> = ({ cart, checkout }) => {
  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold">🛒 Giỏ Hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price.toLocaleString()} VND</span>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full"
          onClick={checkout}
        >
          Thanh toán
        </button>
      )}
    </div>
  );
};

export default Cart;
