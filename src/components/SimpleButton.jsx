import React from "react";

function SimpleButton() {
  const handleClick = () => {
    alert("Button Clicked! 🚀");
  };

  return (
    <div className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-3">
        🚀 Exercise 1: Simple Button Click
      </h2>
      <p className="mb-5 text-gray-600">
        Click vào button bên dưới để hiển thị thông báo alert.
      </p>
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-blue-600 shadow-md hover:shadow-lg"
      >
        Click Me!
      </button>
    </div>
  );
}

export default SimpleButton;