import React, { useState, useEffect, createContext, useRef } from "react";
import InputSection from "./InputSections";
import DropItem from "./DropItem";
import { motion } from "framer-motion";

import {auth, firestore} from '../App'
import { todosVaraints } from "../utils/framerMotion";
import Item from "./Item";
import { useContext } from "react";

const ItemsProvider = createContext();
export const useItemProvider = () => {
  return useContext(ItemsProvider);
};

export default function Todos({ userDoesExist, allData, userName }) {
  const [allTodos, setAllTodos] = useState([]);
  const [renderedComponent, setRenderedComponent] = useState("btn");
  const handleAddNewInput = () => {
    setRenderedComponent("text-input");
  };
  const dbRef = firestore.collection("notes");
  useEffect(() => {
    const filterTodosFromDB = () => {
      const todos = allData.filter((item) => item.isTodo === true);
      setAllTodos(todos);
    };
    filterTodosFromDB();
  }, [allData]);

  const mainContainerClicked = (clickEvent) => {
    if (
      clickEvent.target.className !== "add-button" &&
      clickEvent.target.tagName !== "INPUT"
    ) {
      setRenderedComponent("btn");
    }
  };
  const markItemAsDone = async (itemId) => {
    await dbRef.doc(itemId).delete()
  };
  return (
    <ItemsProvider.Provider value={markItemAsDone}>
      <motion.div
        onClick={(e) => mainContainerClicked(e)}
        className="todos-section"
        variants={todosVaraints}
        initial="hidden"
        animate="visible"
      >
        <h1>Todos</h1>
        {userDoesExist && (
          <>
            {renderedComponent === "btn" ? (
              <button className="add-button" onClick={handleAddNewInput}>
                <span id="add-sign">+</span> New Todo
              </button>
            ) : (
              <InputSection
                item="todos"
                userName={userName}
                setRenderedComponent={setRenderedComponent}
              />
            )}
            {allTodos.map((todo, idx) => (
              <Item key={idx} data={todo} />
            ))}
            {allTodos.length !== 0 && <DropItem />}
          </>
        )}
      </motion.div>
    </ItemsProvider.Provider>
  );
}
