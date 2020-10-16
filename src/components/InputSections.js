import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import { auth, firestore } from "../App";

export default function InputSections({
  item,
  setAllTodos,
  allNotes,
  setAllNotes,
  editOptions,
  setRenderedComponent,
  setRenderedComponentForEdit,
  setEditOptions,
  userName,
}) {
  function checkEditOpsExist() {
    if (editOptions) {
      return editOptions.itemIndex;
    }
    return -1;
  }
  const [itemToEditIdx] = useState(checkEditOpsExist);
  const [textVal, setTextVal] = useState(() => {
    if (itemToEditIdx !== -1) {
      return editOptions.itemPrevText;
    }
    return "";
  });
  const [currentUser] = useState(userName);

  const dbRef = firestore.collection("notes");
  const handleAddText = async () => {
    const newText = textVal;
    let newItem;
    if (item === "notes") {
      newItem = {
        id: Math.ceil(Math.random() * 1000),
        type: "note",
        text: newText,
      };
      await dbRef.add({
        text: JSON.stringify(newText),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userName: currentUser,
        isTodo: false,
        isChecked: false,
      });
      setRenderedComponent("btn");
    } else if (item === "edit") {
      const { itemIndex } = editOptions;
      const noteToEditIndex = allNotes.findIndex(
        (note, idx) => idx === itemIndex
      );
      allNotes[noteToEditIndex].text = newText;
      setRenderedComponentForEdit("btn");
      setEditOptions(false);
    } else {
      await dbRef.add({
        text: JSON.stringify(newText),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userName: currentUser,
        isTodo: true,
        isChecked: false,
      });
    }
    setTextVal("");
  };
  return (
    <div className="input-section">
      <input
        className="input-section-text"
        type="text"
        placeholder={
          item == "edit"
            ? `edit item ${itemToEditIdx} here..`
            : "type something..."
        }
        value={textVal}
        onChange={(e) => setTextVal(e.target.value)}
      />
      <button
        disabled={textVal.length <= 1}
        className="input-section-button"
        onClick={handleAddText}
      >
        {item === "edit" ? "save" : "add"}
      </button>
    </div>
  );
}
