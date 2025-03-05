import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      navigate("/");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">📊 Dashboard</h2>

      <div className="mt-4 flex gap-4">
        <Link to="/profile/John" className="px-4 py-2 bg-green-500 text-white rounded-lg">👤 Profile</Link>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleLogout} disabled={loading}>
          {loading ? "Logging out..." : "🚪 Logout"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
