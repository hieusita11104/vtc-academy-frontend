import { useState } from "react";
import ContactForm from "./components/ContactForm";
import Register from "./components/Register";
import DynamicForm from "./components/DynamicForm";
import RegisterForm from "./components/RegisterForm";
import AdvancedForm from "./components/AdvancedForm"; // Thêm form mới

function App() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "contact"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Contact Form
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "register"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Register
        </button>
        <button
          onClick={() => setActiveTab("dynamicForm")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "dynamicForm"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Dynamic Form
        </button>
        <button
          onClick={() => setActiveTab("RegisterForm")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "RegisterForm"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          API Submission
        </button>
        <button
          onClick={() => setActiveTab("advancedForm")}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === "advancedForm"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Advanced Form
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activeTab === "contact" && <ContactForm />}
        {activeTab === "register" && <Register />}
        {activeTab === "dynamicForm" && <DynamicForm />}
        {activeTab === "RegisterForm" && <RegisterForm />}
        {activeTab === "advancedForm" && <AdvancedForm />}
      </div>
    </div>
  );
}

export default App;
