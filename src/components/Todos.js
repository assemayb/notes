import React, { useState, useRef, createContext } from "react";
import InputSection from "./InputSections";
import DropItem from "./DropItem";
import { motion } from "framer-motion";
import { data } from "../mockData";
import { todosVaraints } from "../utils/framerMotion";
import Item from "./Item";
import { useContext } from "react";
import { itemTypes } from "../dnd/items";

const todosData = data.filter((item) => item.type === "todo");

const ItemsProvider = createContext();
export const useItemProvider = () => {
  return useContext(ItemsProvider);
};

export default function Todos() {
  const [allTodos, setAllTodos] = useState(todosData);
  const [renderedComponent, setRenderedComponent] = useState("btn");
  const handleAddNewInput = () => {
    setRenderedComponent("text-input");
  };
  const markItemAsDone = (itemId) => {
    const newTodos = allTodos.filter((todo) => todo.id !== itemId);
    setAllTodos(newTodos)
  };
  return (
    <ItemsProvider.Provider value={markItemAsDone}>
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
        {allTodos
          .filter((todo) => todo.state === "in")
          .map((todo, idx) => (
            <Item key={idx} data={todo} />
          ))}
        {allTodos.length !== 0 && <DropItem />}
      </motion.div>
    </ItemsProvider.Provider>
  );
}
