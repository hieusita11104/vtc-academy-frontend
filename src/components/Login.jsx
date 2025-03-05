import React, { useState } from "react";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      localStorage.setItem("authToken", "your_token_here");
      setToken("your_token_here");
    } else {
      alert("❌ Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div>
      <h2>🔐 Đăng nhập</h2>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default Login;
