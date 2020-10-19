import React, { useState, useEffect } from "react";
import InputSection from "./InputSections";
import { motion } from "framer-motion";
import { notesVaraints } from "../utils/framerMotion";


import { firestore, auth } from "../App";

export default function Notes({ userDoesExist, allData, userName }) {
  const [allNotes, setAllNotes] = useState([]);
  const [renderedComponent, setRenderedComponent] = useState("btn");
  const [hoverOptions, setHoverOptions] = useState({
    hoveredItemIndex: -1,
  });
  const [editOptions, setEditOptions] = useState({
    itemID: null,
    isAllowed: false,
    itemIndex: "-1",
    itemPrevText: "",
  });

  useEffect(() => {
    const filterNotesFromDB = () => {
      const notes = allData.filter((item) => item.isTodo === false);
      setAllNotes(notes);
    };
    filterNotesFromDB();
  }, [allData]);

  const handleAddNewInput = () => {
    setRenderedComponent("text-input");
  };

  // For hovering effect
  const handleMouseEnter = (event, itemIndex) => {
    setHoverOptions({ ...hoverOptions, hoveredItemIndex: itemIndex });
  };
  const handleMouseLeave = (event, itemIndex) => {
    setHoverOptions({ hoveredItemIndex: -1 });
  };

  // database functions
  const dbRef = firestore.collection("notes");
  const editItem = (itemIdx, itemID, itemText) => {
    setEditOptions({
      itemID,
      isAllowed: true,
      itemIndex: itemIdx,
      itemPrevText: itemText,
    });
  };

  const deleteItem = async (itemID) => {
    await dbRef.doc(itemID).delete().then(console.log("item deleted"));
  };

  const mainContainerClicked = (clickEvent) => {
    if (
      clickEvent.target.className !== "add-button" &&
      clickEvent.target.tagName !== "INPUT" &&
      clickEvent.target.tagName !== "BUTTON"
    ) {
      if (editOptions.isAllowed == true) {
        setEditOptions({
          itemID: null,
          isAllowed: false,
          itemIndex: "-1",
          itemPrevText: "",
        });
      }
      setRenderedComponent("btn");
    }
  };
  return (
    <motion.div
      onClick={(e) => mainContainerClicked(e)}
      className="notes-section"
      variants={notesVaraints}
      initial="hidden"
      animate="visible"
    >
      <h1>Notes</h1>
      {userDoesExist && (
        <>
          {renderedComponent === "btn" && !editOptions.isAllowed ? (
            <button className="add-button" onClick={handleAddNewInput}>
              <span id="add-sign">+</span> New Note
            </button>
          ) : renderedComponent === "btn" && editOptions.isAllowed ? (
            <InputSection
              item="edit"
              editOptions={editOptions}
              setEditOptions={setEditOptions}
              setRenderedComponent={setRenderedComponent}
            />
          ) : (
            <InputSection
              item="notes"
              setRenderedComponent={setRenderedComponent}
              userName={userName}
            />
          )}
          {allNotes.map((note, idx) => (
            <div
              key={idx}
              className="note-output-item"
              onMouseEnter={(e) => handleMouseEnter(e, idx)}
              onMouseLeave={(e) => handleMouseLeave(e, idx)}
              onTouchStart={(e) => handleMouseEnter(e, idx)}
              onTouchEnd={(e) => handleMouseLeave(e, idx)}
            >
              <div>
                {hoverOptions.hoveredItemIndex === idx &&
                renderedComponent === "btn" ? (
                  <div className="hovered-btns">
                    <button
                      onClick={(e) => editItem(idx, note.id, note.text)}
                      className="hovered-btn"
                    >
                      edit
                    </button>
                    <button
                      disabled={editOptions.isAllowed}
                      onClick={() => deleteItem(note.id)}
                      className="hovered-btn"
                    >
                      delete
                    </button>
                  </div>
                ) : (
                  <h4>{note.text}</h4>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </motion.div>
  );
}
