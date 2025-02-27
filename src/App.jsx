import { Routes, Route, Link } from "react-router-dom";
import Lab01 from "./pages/Lab01";
import Lab02 from "./pages/Lab02";
import Lab03 from "./pages/Lab03";
import Lab04 from "./pages/Lab04";
import Lab05 from "./pages/Lab05";

export default function App() {
  return (
    <>
      {}
      <div className="flex justify-center space-x-6 p-5 bg-gradient-to-r from-gray-900 to-gray-700 shadow-md">
        <Link
          to="/Lab01"
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold transition duration-300 hover:bg-red-600 shadow-md"
        >
          Lab 01
        </Link>
        <Link
          to="/Lab02"
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold transition duration-300 hover:bg-yellow-600 shadow-md"
        >
          Lab 02
        </Link>
        <Link
          to="/Lab03"
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold transition duration-300 hover:bg-orange-600 shadow-md"
        >
          Lab 03
        </Link>
        <Link
          to="/Lab04"
          className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold transition duration-300 hover:bg-green-600 shadow-md"
        >
          Lab 04
        </Link>
        <Link
          to="/Lab05"
          className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold transition duration-300 hover:bg-purple-600 shadow-md"
        >
          Lab 05
        </Link>
      </div>

      <Routes>
        <Route path="/Lab01/*" element={<Lab01 />} />
        <Route path="/Lab02/*" element={<Lab02 />} />
        <Route path="/Lab03/*" element={<Lab03 />} />
        <Route path="/Lab04/*" element={<Lab04 />} />
        <Route path="/Lab05/*" element={<Lab05 />} />
      </Routes>
    </>
  );
}
