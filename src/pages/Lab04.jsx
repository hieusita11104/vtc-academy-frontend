import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputHandling from "../components/InputHandling";
import SimpleButton from "../components/SimpleButton";
import MouseEvents from "../components/MouseEvents";
import KeyboardEvents from "../components/KeyboardEvents";
import Counter from "../components/Counter";

export default function Lab04() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.replace("/lab04/", "") || "simple-button";

  const handleTabClick = (tab) => {
    navigate(`/lab04/${tab}`);
  };

  return (
    <div className="p-6 text-center font-sans">
      <h1 className="text-2xl font-bold text-orange-600">🎯 Lab 04: Event Handling</h1>

      <div className="flex justify-center gap-4 mt-4 border-b pb-2">
        {[
          { key: "simple-button", label: "Simple Button" },
          { key: "input-handling", label: "Input Handling" },
          { key: "mouse-events", label: "Mouse Events" },
          { key: "keyboard-events", label: "Keyboard Events" },
          { key: "counter", label: "Counter" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === tab.key ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 border rounded-b-lg shadow-md mt-2">
        {activeTab === "simple-button" && <SimpleButton />}
        {activeTab === "input-handling" && <InputHandling />}
        {activeTab === "mouse-events" && <MouseEvents />}
        {activeTab === "keyboard-events" && <KeyboardEvents />}
        {activeTab === "counter" && <Counter />}
      </div>
    </div>
  );
}
