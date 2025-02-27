import { useState } from "react";
import CounterComponent from "../components/CounterComponent";
import UserInput from "../components/UserInput";
import MemoizedBox from "../components/MemoizedBox";
import SumCalculation from "../components/SumCalculation";
import SearchWithDebounce from "../components/SearchWithDebounce";

const tabs = [
  { id: "counter", label: "Counter Hook", component: <CounterComponent /> },
  { id: "user-input", label: "User Input", component: <UserInput /> },
  { id: "memoization", label: "Memoization", component: <MemoizedBox /> },
  { id: "sum-calculation", label: "Sum Calculation", component: <SumCalculation /> },
  { id: "search-debounce", label: "Search Debounce", component: <SearchWithDebounce /> },
];

export default function Lab05() {
  const [activeTab, setActiveTab] = useState("counter");

  return (
    <div className="p-5 text-center font-sans">
      <h1 className="text-2xl font-bold text-purple-600">📝 Lab 05 : React Hooks</h1>

      <nav className="flex justify-center gap-4 mt-3 border-b border-purple-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-2 border-b-2 transition duration-300 ${
              activeTab === tab.id
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-purple-500 hover:border-purple-600 hover:text-purple-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border rounded-b-lg shadow-md mt-2">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}
