import React, { useState, useEffect } from "react";

export default function InputSections({
  item,
  setAllTodos,
  allNotes,
  setAllNotes,
  editOptions,
  setRenderedComponent,
  setRenderedComponentForEdit,
  setEditOptions,
}) {
  function checkEditOpsExist() {
    if (editOptions) {
      return editOptions.itemIndex;
    }
    return -1;
  }
  const [itemToEditIdx, setItemToEditIdx] = useState(checkEditOpsExist);
  const [textVal, setTextVal] = useState(() => {
    if (itemToEditIdx !== -1) {
      return editOptions.itemPrevText;
    }
    return "";
  });

  const handleAddText = () => {
    const newText = textVal;
    let newItem;
    if (item === "notes") {
      newItem = {
        id: Math.ceil(Math.random() * 1000),
        type: "note",
        text: newText,
      };
      setAllNotes((oldNotes) => [...oldNotes, newItem]);
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
      newItem = {
        id: Math.ceil(Math.random() * 1000),
        type: "todo",
        text: newText,
        state: "in",
      };
      console.log(newItem);
      setAllTodos((oldTodos) => [...oldTodos, newItem]);
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
