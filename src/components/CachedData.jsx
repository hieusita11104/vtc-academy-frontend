import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const CachedData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const cachedData = localStorage.getItem("cachedPosts");
    if (cachedData) {
      setData(JSON.parse(cachedData));
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      localStorage.setItem("cachedPosts", JSON.stringify(response.data));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📜 Danh sách Bài Viết (Có Cache)</h2>
      <ul className="space-y-2">
        {data.slice(0, 5).map((post) => (
          <li
            key={post.id}
            className="bg-gray-100 p-3 rounded-md border border-gray-300 hover:bg-gray-200 transition"
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CachedData;
