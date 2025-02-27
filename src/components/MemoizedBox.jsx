import React, { useState, useMemo } from "react";

const MemoizedBox = () => {
  const [isHovered, setIsHovered] = useState(false);

  const boxStyle = useMemo(() => {
    console.log("Tính toán lại style...");
    return {
      width: "200px",
      height: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: isHovered ? "red" : "#f0f0f0",
      transition: "background-color 0.3s ease",
    };
  }, [isHovered]);

  return (
    <>
      <div className="text-center font-sans">
        <h2 className="text-xl font-bold">Exercise 3: Implementing Memoization with UseMemo</h2>
      </div>
      <div
        className="w-48 h-48 flex items-center justify-center text-lg font-bold rounded-lg transition-colors duration-300"
        style={boxStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? "Hover Active!" : "Hover Me!"}
      </div>
    </>
  );
};

export default MemoizedBox;