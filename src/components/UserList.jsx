import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (err) {
        setError("❌ Không thể tải danh sách người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-blue-500 text-lg">⏳ Đang tải...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Danh sách Người Dùng</h2>
      <ul className="space-y-3">
        {users.map(user => (
          <li 
            key={user.id} 
            className="p-3 border rounded-lg shadow-sm flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="text-gray-700 font-medium">{user.name}</span>
            <span className="text-gray-500 text-sm">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
