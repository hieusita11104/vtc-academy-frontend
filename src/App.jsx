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
    <div>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <h1>🏠 Dashboard</h1>
          <button onClick={handleLogout}>🚪 Logout</button>

          <div>
            <button onClick={() => setActiveTab("users")}>👥 Users</button>
            <button onClick={() => setActiveTab("posts")}>📝 Post Management</button>
            <button onClick={() => setActiveTab("cache")}>🚀 API Caching</button>
          </div>

          {activeTab === "users" && <UserList />}
          {activeTab === "posts" && <PostManager />}
          {activeTab === "cache" && <CachedData />}
        </>
      )}
    </div>
  );
}

export default App;
