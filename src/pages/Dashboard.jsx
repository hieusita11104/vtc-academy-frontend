import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      navigate("/login");
      setLoading(false); 
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">📊 Dashboard</h2>

      {loading ? (
        <div className="mt-4 flex items-center">
          <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <span className="ml-2 text-red-500">Logging out...</span>
        </div>
      ) : (
        <button 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={handleLogout}
          disabled={loading}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Dashboard;
