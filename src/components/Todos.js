import React, { useState } from "react";
import InputSection from "./InputSections";

const todosData = [
  "this is the first test todo",
  "this is the second test todo",
];

export default function Todos() {
  const [allTodos, setAllTodos] = useState(todosData);
  const [renderedComponent, setRenderedComponent] = useState("btn");
  const handleAddNewInput = () => {
    setRenderedComponent("text-input");
  };
  return (
    <div className="todos-section">
      <h1>The Todos</h1>
      {renderedComponent === "btn" ? (
        <button className="add-button" onClick={handleAddNewInput}>
          <span id="add-sign">+</span> New Todo
        </button>
      ) : (
        <InputSection setAllTodos={setAllTodos} />
      )}
      {allTodos.map((todo, idx) => (
        <h3 key={idx}>{todo}</h3>
      ))}
    </div>
  );
}
