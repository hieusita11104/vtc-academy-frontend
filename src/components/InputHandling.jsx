import React, { useState } from "react";

function InputHandling() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="p-8 text-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-4 text-indigo-600">
        ✍️ Exercise 2: Handling Input Changes
      </h2>
      <p className="mb-6 text-gray-700 text-lg">
        Nhập text vào ô input bên dưới để xem kết quả thay đổi
      </p>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="px-5 py-3 border-2 border-gray-400 rounded-lg w-96 text-center text-gray-900 text-lg focus:border-indigo-500 outline-none transition-all duration-300 shadow-sm bg-white"
        placeholder="Nhập vào đây..."
      />

      <p className="mt-6 text-xl font-semibold">
        Giá trị hiện tại:{" "}
        <span className="text-indigo-600 font-bold">{inputValue}</span>
      </p>
    </div>
  );
}

export default InputHandling;