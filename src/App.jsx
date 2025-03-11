import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import UserList from "./components/UserList";
import PostManager from "./components/PostManager";
import CachedData from "./components/CachedData";

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">🏠 Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              🚪 Logout
            </button>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === "users"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              👥 Users
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === "posts"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              📝 Post Management
            </button>
            <button
              onClick={() => setActiveTab("cache")}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === "cache"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              🚀 API Caching
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            {activeTab === "users" && <UserList />}
            {activeTab === "posts" && <PostManager />}
            {activeTab === "cache" && <CachedData />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
