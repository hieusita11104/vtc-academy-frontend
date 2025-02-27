import { useState } from "react";
import InputHandling from "../components/InputHandling";
import SimpleButton from "../components/SimpleButton";
import MouseEvents from "../components/MouseEvents";
import KeyboardEvents from "../components/KeyboardEvents";
import Counter from "../components/Counter";

export default function Lab04() {
  const [activeTab, setActiveTab] = useState("simple-button");

  return (
    <div className="p-6 text-center font-sans">
      <h1 className="text-2xl font-bold text-orange-600">🎯 Lab 04: Event Handling</h1>

      {}
      <div className="flex justify-center gap-4 mt-4 border-b pb-2">
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "simple-button"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("simple-button")}
        >
          Simple Button
        </button>

        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "input-handling"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("input-handling")}
        >
          Input Handling
        </button>

        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "mouse-events"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("mouse-events")}
        >
          Mouse Events
        </button>

        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "keyboard-events"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("keyboard-events")}
        >
          Keyboard Events
        </button>

        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "counter"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("counter")}
        >
          Counter
        </button>
      </div>

      {}
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
