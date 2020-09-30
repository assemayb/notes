import React, { useState } from "react";
import InputSection from "./InputSections";

const notesData = [
  "this is the first test note",
  "this is the second test note",

];

export default function Notes() {
  const [allNotes, setAllNotes] = useState(notesData);
  const [renderedComponent, setRenderedComponent] = useState("btn");
  const handleAddNewInput = () => {
    setRenderedComponent("text-input");
  };
  return (
    <div className="notes-section">
      <h1>The Notes</h1>
      {renderedComponent === "btn" ? (
        <button className="add-button" onClick={handleAddNewInput}>
          <span id="add-sign">+</span> New Note
        </button>
      ) : (
        <InputSection setAllNotes={setAllNotes} />
      )}
      {allNotes.map((note, idx) => (
        <h3 key={idx}>{note}</h3>
      ))}
    </div>
  );
}
