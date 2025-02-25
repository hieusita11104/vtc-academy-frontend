import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-900">Exercise 5: Counter</h2>
      <p className="mb-4 text-gray-700">Sử dụng các button để tăng/giảm giá trị counter</p>

      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setCount(count - 1)}
        >
          – Giảm
        </button>

        <span className="text-3xl font-bold">{count}</span>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setCount(count + 1)}
        >
          + Tăng
        </button>
      </div>
    </div>
  );
}

export default Counter;
