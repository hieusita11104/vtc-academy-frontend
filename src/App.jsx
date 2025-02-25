import React from "react";
import InputHandling from "./components/inputhandling";
import SimpleButton from "./components/simplebutton";
import MouseEvents from "./components/MouseEvents";
import KeyboardEvents from "./components/KeyboardEvents";
import Counter from "./components/Counter";
function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white space-y-6">
      <h1 className="text-2xl font-bold">React Exercises</h1>
      
      <SimpleButton />

      <InputHandling />

      <MouseEvents />

      <KeyboardEvents />

      <Counter />
    </div>
  );
}

export default App;
