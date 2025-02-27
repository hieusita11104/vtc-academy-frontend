import React, { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-50 shadow-xl rounded-xl">
      {}
      <h2 className="text-3xl font-bold text-red-600 mb-6">📝 Todo List</h2>

      {}
      <div className="mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-4 w-full rounded-lg shadow-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="mt-4 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Add Todo
        </button>
      </div>

      {}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-4 border-b rounded-lg ${
              todo.completed ? "bg-gray-200 line-through text-gray-500" : "bg-white text-gray-800"
            }`}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 rounded-full border-2 border-red-500 focus:ring-2 focus:ring-red-300"
              />
              <span>{todo.text}</span>
            </div>
          </li>
        ))}
      </ul>

      {}
      <button
        onClick={clearCompleted}
        className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
      >
        Clear Completed
      </button>
    </div>
  );
}
