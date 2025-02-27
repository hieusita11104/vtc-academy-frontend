import React from "react";

function SimpleJSXComponent() {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-blue-600">🔹 Exercise 2: Create Simple JSX Structures</h2>
      <h1 className="text-2xl font-bold text-gray-800">ReactJS with JSX</h1>
      <p className="text-gray-600">
        Welcome to the world of ReactJS! Below is a simple list of items:
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
}

export default SimpleJSXComponent;
