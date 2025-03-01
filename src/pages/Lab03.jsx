import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AlbumList from "../components/AlbumList"; 
import TodoList from "../components/TodoList";

export default function Lab03() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("exercise-2") ? "exercise-2" : "exercise-1";

  const handleTabClick = (tab) => {
    navigate(`/lab03/${tab}`);
  };

  return (
    <div className="p-6 text-center font-sans">
      <h1 className="text-2xl font-bold text-blue-700">📘 Lab 03: Exercises</h1>

      <div className="flex justify-center gap-4 mt-4 border-b pb-2">
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "exercise-1" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabClick("exercise-1")}
        >
          Exercise 1: Album List
        </button>

        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "exercise-2" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabClick("exercise-2")}
        >
          Exercise 2: Todo List
        </button>
      </div>

      <div className="p-4 border rounded-b-lg shadow-md mt-2">
        {activeTab === "exercise-1" && <AlbumList />}
        {activeTab === "exercise-2" && <TodoList />}
      </div>
    </div>
  );
}
