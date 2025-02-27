import React, { useState, useEffect } from "react";

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-center">
      <h2 className="text-lg font-semibold text-green-600">
        ⏳ Exercise 3: Embedding JavaScript Expressions in JSX
      </h2>
      <h1 className="text-2xl font-bold text-gray-800">
        Current Time:
      </h1>
      <p className="text-gray-600 text-xl">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default CurrentTime;
