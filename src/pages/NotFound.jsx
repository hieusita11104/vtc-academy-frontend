import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-500">🚫 Page Not Found</h2>
      <p className="mt-4 text-lg">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">🏠 Back to Home</Link>
    </div>
  );
};

export default NotFound;
