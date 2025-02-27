import React, { useState, useCallback } from "react";

const SearchWithDebounce = () => {
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("all");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const search = useCallback((searchTerm) => {
    console.log(`🔍 Tìm kiếm: ${searchTerm} | Option: ${option}`);
    setLoading(true);
    setTimeout(() => {
      setResult(`Kết quả cho "${searchTerm}" với kiểu tìm kiếm "${option}"`);
      setLoading(false);
    }, 1000); 
  }, [option]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      if (value.trim() !== "") {
        search(value);
      }
    }, 500);
  };

  return (
    <div className="p-5 text-center font-sans">
      <h2 className="text-xl font-bold">🔍 Tìm kiếm với Debounce</h2>
      <p className="text-gray-600">Chọn kiểu tìm kiếm và nhập từ khóa</p>

      {}
      <select
        value={option}
        onChange={(e) => setOption(e.target.value)}
        className="mt-3 p-2 border rounded"
      >
        <option value="all">Tất cả</option>
        <option value="title">Theo tiêu đề</option>
        <option value="author">Theo tác giả</option>
      </select>

      {}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Nhập từ khóa..."
        className="mt-3 p-2 border rounded w-full max-w-md"
      />

      {}
      <div className="mt-3">
        {loading ? (
          <p className="text-blue-500">⏳ Đang tìm kiếm...</p>
        ) : (
          result && <p className="text-green-500">{result}</p>
        )}
      </div>
    </div>
  );
};

export default SearchWithDebounce;
