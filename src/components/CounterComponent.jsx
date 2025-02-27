import React from "react";
import useCounter from "../hooks/useCounter";

const CounterComponent = () => {
  const { count, increment, decrement, reset } = useCounter(3, -10, 10);

  return (
    <div className="text-center font-sans p-5">
      <h2 className="text-xl font-bold">Exercise 1: Creating and Using a Counter Hook</h2>
      <p className="text-gray-600">Sử dụng custom hook useCounter để quản lý state của counter</p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-700"
        >
          − Giảm
        </button>

        <span className="text-2xl font-bold">{count}</span>

        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-700"
        >
          + Tăng
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-300 text-red border rounded transition duration-300 hover:bg-gray-400"
        >
          ⟳ Reset
        </button>
      </div>

      <p className="text-gray-500 mt-2">Giới hạn: -10 đến 10</p>
    </div>
  );
};

export default CounterComponent;
