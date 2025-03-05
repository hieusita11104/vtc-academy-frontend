import { Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold">Loading...</span>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile/:name" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
