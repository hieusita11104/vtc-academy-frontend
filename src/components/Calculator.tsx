import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const handleAddition = () => {
    setResult(num1 + num2);
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg w-80 bg-white text-center">
      <h2 className="text-lg font-bold mb-4">🧮 Simple Calculator</h2>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter first number"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter second number"
      />
      <button
        onClick={handleAddition}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
      >
        Add Numbers
      </button>
      {result !== null && <p className="mt-4 text-xl">Result: {result}</p>}
    </div>
  );
};

export default Calculator;
