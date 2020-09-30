import { useState } from "react";
import React from "react";

export default function InputSections({ setAllTodos, setAllNotes }) {
  const [textVal, setTextVal] = useState("");
  const handleAddText = () => {
    const newText = textVal;
    if (newText !== "") {
      if (setAllNotes) {
        setAllNotes((oldNotes) => [...oldNotes, newText]);
      } else {
        setAllTodos((oldTodos) => [...oldTodos, newText]);
      }
    }
    setTextVal("")
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
      <button disabled={textVal.length <= 1} className="input-section-button" onClick={handleAddText}>
        add
      </button>
    </div>
  );
}
