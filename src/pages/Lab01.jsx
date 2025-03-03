import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SimpleJSXComponent from "../components/SimpleJSXComponent";
import CurrentTime from "../components/CurrentTime";

export default function Lab01() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("ex3") ? "exercise-3" : "exercise-2";

  const handleTabClick = (tab) => {
    navigate(`/lab01/${tab === "exercise-2" ? "ex2" : "ex3"}`);
  };

  return (
    <div className="p-6 text-center font-sans">
      <h1 className="text-2xl font-bold text-blue-700">📘 Lab 01: JSX Basics</h1>

      <div className="flex justify-center gap-4 mt-4 border-b pb-2">
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "exercise-2" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabClick("exercise-2")}
        >
          Exercise 2: JSX Structures
        </button>

        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "exercise-3" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabClick("exercise-3")}
        >
          Exercise 3: JS in JSX
        </button>
      </div>

      <div className="p-4 border rounded-b-lg shadow-md mt-2">
        {activeTab === "exercise-2" && <SimpleJSXComponent />}
        {activeTab === "exercise-3" && <CurrentTime />}
      </div>
    </div>
  );
}
