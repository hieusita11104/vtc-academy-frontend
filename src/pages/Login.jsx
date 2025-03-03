import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true); 
    setTimeout(() => {
      login();
      navigate("/dashboard");
      setLoading(false); 
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">🔐 Login Page</h2>
      
      {loading ? (
        <div className="mt-4 flex items-center">
          <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <span className="ml-2 text-blue-500">Logging in...</span>
        </div>
      ) : (
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleLogin}
          disabled={loading}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
