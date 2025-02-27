import React, { useState } from "react";

function MouseEvents() {
  const [bgColor, setBgColor] = useState("bg-blue-500");
  const [text, setText] = useState("Hover me!");

  const handleMouseEnter = () => {
    setBgColor("bg-red-500");
    setText("Đã thay đổi!"); 
  };

  const handleMouseLeave = () => {
    setBgColor("bg-blue-500");
    setText("Hover me!"); 
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-900">
        Exercise 3: Handling Mouse Events
      </h2>
      <p className="mb-4 text-gray-700">
        Di chuột vào box bên dưới để thay đổi màu nền và nội dung chữ
      </p>
      <div
        className={`w-40 h-40 flex justify-center items-center text-white font-bold rounded-lg shadow-lg transition-all duration-500 ${bgColor}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </div>
    </div>
  );
}

export default MouseEvents;