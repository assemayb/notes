import React, { useState } from "react";
import InputSection from "./InputSections";
import DropItem from './DropItem';
import { motion } from "framer-motion";
import { todosVaraints } from "../utils/framerMotion";

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
    <motion.div
      className="todos-section"
      variants={todosVaraints}
      initial="hidden"
      animate="visible"
    >
      <h1>Todos</h1>
      {renderedComponent === "btn" ? (
        <button className="add-button" onClick={handleAddNewInput}>
          <span id="add-sign">+</span> New Todo
        </button>
      ) : (
        <InputSection item="todos" setAllTodos={setAllTodos} />
      )}
      <DropItem item="todo"/>
      {allTodos.map((todo, idx) => (
        <div key={idx} className="output-item">
          <h3>{todo}</h3>
        </div>
      ))}
    </motion.div>
  );
}
