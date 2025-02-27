import React, { useState } from "react";

function KeyboardEvents() {
  const [inputText, setInputText] = useState(""); 
  const [items, setItems] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputText.trim() !== "") {
      setItems([...items, inputText]); 
      setInputText(""); 
    }
  };

  return (
    <div className="p-6 text-center bg-gray-800 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        Exercise 4: Handling Keyboard Events
      </h2>
      <p className="mb-4 text-white">Nhập text và nhấn Enter để thêm vào danh sách</p>
      
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập text và nhấn Enter..."
        className="border p-2 rounded w-64 text-black bg-white"
      />

      <ul className="mt-4 text-left text-white">
        {items.map((item, index) => (
          <li key={index} className="border-b py-2 text-blue-300">
            {index + 1}. {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeyboardEvents;