import React, { useState, useMemo } from "react";

const SumCalculation = () => {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const totalSum = useMemo(() => {
    console.log("Đang tính toán lại tổng...");
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  const handleAddNumber = () => {
    if (inputValue.trim() !== "" && !isNaN(inputValue)) {
      setNumbers([...numbers, parseInt(inputValue, 10)]);
      setInputValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddNumber();
    }
  };

  const handleRemoveNumber = (index) => {
    const newNumbers = numbers.filter((_, i) => i !== index);
    setNumbers(newNumbers);
  };

  return (
    <div className="w-80 mx-auto mt-5 font-sans">
      <h2 className="text-xl font-bold">Exercise 4: Sum Calculation with useMemo</h2>
      <p className="text-gray-600">Nhập số và nhấn Enter để thêm vào danh sách. Tổng sẽ được tính lại chỉ khi danh sách thay đổi.</p>
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Nhập số..."
        className="border p-2 rounded-lg w-3/4"
      />
      <button onClick={handleAddNumber} className="ml-2 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">
        Thêm
      </button>

      <ul className="list-none p-0 mt-3">
        {numbers.map((num, index) => (
          <li key={index} className="mt-2 flex justify-between">
            Số {num}
            <button onClick={() => handleRemoveNumber(index)} className="ml-3 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600">
              Xóa
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-3">Tổng: {totalSum}</h3>
    </div>
  );
};

export default SumCalculation;