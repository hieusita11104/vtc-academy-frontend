import React, { useState } from "react";

const UserInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    alert(`Giá trị hiện tại: ${value}`);
  };

  return (
    <div className="text-center mt-5">
      <h2 className="text-xl font-bold">Exercise 2: Managing User Input with State Hook</h2>
      <p className="text-gray-600">Sử dụng useState để quản lý giá trị input</p>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Nhập giá trị..."
        className="border p-2 text-lg rounded-lg"
      />
      <button onClick={handleClick} className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Hiển thị
      </button>
    </div>
  );
};

export default UserInput;