import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setPosts(res.data.slice(0, 5)));
  }, []);

  const addPost = () => {
    if (!newPost.trim()) return;
    axios.post(API_URL, { title: newPost }).then((res) => {
      setPosts([...posts, res.data]);
      setNewPost("");
    });
  };

  const deletePost = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Quản lý Bài Viết</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Nhập tiêu đề bài viết..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addPost}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          ➕ Thêm
        </button>
      </div>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
          >
            <span className="text-gray-700">{post.title}</span>
            <button
              onClick={() => deletePost(post.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              ❌ Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostManager;
