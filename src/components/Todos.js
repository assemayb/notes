import React, { useState, useRef } from "react";
import InputSection from "./InputSections";
import DropItem from "./DropItem";
import { motion } from "framer-motion";
import { data } from "../mockData";
import { todosVaraints } from "../utils/framerMotion";
import Item from "./Item";

const todosData = data.filter((item) => item.type === "todo");
console.log(todosData);

export default function Todos() {
  const [allTodos, setAllTodos] = useState(todosData);
  const [renderedComponent, setRenderedComponent] = useState("btn");
  const handleAddNewInput = () => {
    setRenderedComponent("text-input");
  };
  const todosSectionRef = useRef();
  return (
    <motion.div
      ref={todosSectionRef}
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
      {allTodos.map((todo, idx) => (
        <motion.div
          key={idx}
          className="output-item"
          drag
          dragConstraints={todosSectionRef}
        >
          <Item data={todo} />
        </motion.div>
      ))}
      <DropItem />
    </motion.div>
  );
}
