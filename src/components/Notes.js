import React, { useState } from "react";
import InputSection from "./InputSections";
import DropItem from "./DropItem";
import { motion } from "framer-motion";
import { notesVaraints } from "../utils/framerMotion";
import { data } from "../mockData";
import Item from "./Item";
import { useEffect } from "react";

const notesData = data.filter((item) => item.type === "note");

export default function Notes() {
  const [allNotes, setAllNotes] = useState(notesData);
  const [renderedComponent, setRenderedComponent] = useState("btn");
  const [hoverOptions, setHoverOptions] = useState({
    hoveredItemIndex: -1,
  });
  const [editOptions, setEditOptions] = useState({
    isAllowed: false,
    itemIndex: "-1",
    itemPrevText: "",
  });

  const handleAddNewInput = () => {
    setRenderedComponent("text-input");
  };

  // For the hovering effect
  const handleMouseEnter = (event, itemIndex) => {
    setHoverOptions({ ...hoverOptions, hoveredItemIndex: itemIndex });
  };
  const handleMouseLeave = (event, itemIndex) => {
    setHoverOptions({ hoveredItemIndex: -1 });
  };

  const editItem = (itemIdx, itemText) => {
    setEditOptions({ isAllowed: false, itemIndex: "-1" });
    if (itemIdx !== editOptions.itemIndex) {
      setTimeout(() => {
        setEditOptions({
          isAllowed: true,
          itemIndex: itemIdx,
          itemPrevText: itemText,
        });
      }, 150);
    }
  };

  const deleteItem = (itemIdx) => {
    const notes = allNotes.filter((_, index) => index !== itemIdx);
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
      {renderedComponent === "btn" && !editOptions.isAllowed ? (
        <button className="add-button" onClick={handleAddNewInput}>
          <span id="add-sign">+</span> New Note
        </button>
      ) : renderedComponent === "btn" && editOptions.isAllowed ? (
        <InputSection
          item="edit"
          allNotes={allNotes}
          editOptions={editOptions}
          setRenderedComponentForEdit={setRenderedComponent}
          setEditOptions={setEditOptions}
        />
      ) : (
        <InputSection
          item="notes"
          setAllNotes={setAllNotes}
          setRenderedComponent={setRenderedComponent}
        />
      )}
      {allNotes.map((note, idx) => (
        <div
          key={idx}
          className="output-item"
          onMouseEnter={(e) => handleMouseEnter(e, idx)}
          onMouseLeave={(e) => handleMouseLeave(e, idx)}
          onTouchStart={(e) => handleMouseEnter(e, idx)}
          onTouchEnd={(e) => handleMouseLeave(e, idx)}
        >
          <div>
            {hoverOptions.hoveredItemIndex === idx &&
            renderedComponent === "btn" ? (
              <div>
                <div className="hovered-btns">
                  <button
                    onClick={(e) => editItem(idx, note.text)}
                    className="hovered-btn"
                  >
                    edit
                  </button>
                  <button
                    disabled={editOptions.isAllowed}
                    onClick={() => deleteItem(idx)}
                    className="hovered-btn"
                  >
                    delete
                  </button>
                </div>
              </div>
            ) : (
              <h4>{note.text}</h4>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
