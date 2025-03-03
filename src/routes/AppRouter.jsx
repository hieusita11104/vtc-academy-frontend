import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState } from "react";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
  </div>
);

export default function AppRouter() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      {loading && <LoadingSpinner />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Login setLoading={setLoading} />} />
          <Route path="/dashboard" element={<Dashboard setLoading={setLoading} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
