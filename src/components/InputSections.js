import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import { firestore } from "../App";
export default function InputSections({
  item,
  editOptions,
  setRenderedComponent,
  setEditOptions,
  userName,
}) {
  const [currentUser] = useState(userName);
  const [textVal, setTextVal] = useState("");

  useEffect(() => {
    return () => {
      setRenderedComponent("btn");
    };
  }, [item]);

  useEffect(() => {
    if (editOptions) {
      const { itemIndex, itemPrevText } = editOptions;
      setTextVal(itemPrevText);
      return () => {
        setEditOptions({
          isAllowed: false,
          itemIndex,
          itemPrevText: "",
        });
      };
    }
  }, [editOptions]);

  const dbRef = firestore.collection("notes");
  const handleAddText = async () => {
    const newText = textVal;
    if (item === "notes") {
      await dbRef.add({
        text: newText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userName: currentUser,
        isTodo: false,
        isChecked: false,
      });
    } else if (item === "edit") {
      const { itemID, itemPrevText } = editOptions;
      if (newText !== itemPrevText) {
        await dbRef.doc(itemID).update({
          text: newText,
        });
      }
      setEditOptions({
        isAllowed: false,
      });
    } else {
      await dbRef.add({
        text: newText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userName: currentUser,
        isTodo: true,
        isChecked: false,
      });
    }
    setRenderedComponent("btn");
  };
  return (
    <div className="input-section">
      <input
        className="input-section-text"
        type="text"
        placeholder="type something..."
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
