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
    <div>
      <h2>📜 Danh sách Bài Viết (Có Cache)</h2>
      <ul>
        {data.slice(0, 5).map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CachedData;
