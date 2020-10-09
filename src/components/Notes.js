import React, { useState } from "react";
import InputSection from "./InputSections";
import DropItem from "./DropItem";
import { motion } from "framer-motion";
import { notesVaraints } from "../utils/framerMotion";

const notesData = [
  "this is the first test note",
  "this is the second test note",
];

export default function Notes() {
  const [allNotes, setAllNotes] = useState(notesData);
  const [renderedComponent, setRenderedComponent] = useState("btn");
  const [hoverOptions, setHoverOptions] = useState({
    hoveredItemIndex: -1,
  });

  const handleAddNewInput = () => {
    setRenderedComponent("text-input");
  };
  const handleMouseEnter = (event, itemIndex) => {
    console.log("in", itemIndex);
    setHoverOptions({ ...hoverOptions, hoveredItemIndex: itemIndex });
  };
  const handleMouseLeave = (event, itemIndex) => {
    console.log("out", itemIndex);
    setHoverOptions({ hoveredItemIndex: -1 });
  };
  const editItem = (itemIndex) => {
    console.log(itemIndex);
  };
  const deleteItem = (itemIndex) => {
    console.log(itemIndex);
    const notes = allNotes.filter((_, index) => index !== itemIndex);
    setAllNotes(notes);
  };

  return (
    <motion.div
      className="notes-section"
      variants={notesVaraints}
      initial="hidden"
      animate="visible"
    >
      <h1>Notes</h1>
      {renderedComponent === "btn" ? (
        <button className="add-button" onClick={handleAddNewInput}>
          <span id="add-sign">+</span> New Note
        </button>
      ) : (
        <InputSection item="notes" setAllNotes={setAllNotes} />
      )}
      {allNotes.map((note, idx) => (
        <div
          key={idx}
          className="output-item"
          onMouseEnter={(e) => handleMouseEnter(e, idx)}
          onMouseLeave={(e) => handleMouseLeave(e, idx)}
        >
          <div>
            {hoverOptions.hoveredItemIndex === idx ? (
              <div>
                <div className="hovered-btns">
                  <button onClick={() => editItem(idx)} className="hovered-btn">
                    edit
                  </button>
                  <button
                    onClick={() => deleteItem(idx)}
                    className="hovered-btn"
                  >
                    delete
                  </button>
                </div>
              </div>
            ) : (
              <h3>{note}</h3>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
