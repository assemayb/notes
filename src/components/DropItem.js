import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function DropItem({ setDropItemPos }) {
  const [isHoverOver, setIsHoveredOver] = useState(false)
  const itemRef = useRef();

  const handleDragEnter = (e) => {
    console.log("drag enter")
  }
  const handleDragOver = (e) => {
    console.log("something is being dragged over me");
    setIsHoveredOver(true)
  };
  const handleDragExit = (e) => {
    console.log("drag exit")
    setIsHoveredOver(false)
  }
  return (
    <div
      style={{
        backgroundColor: isHoverOver && "cadetBlue" 
      }}
      ref={itemRef}
      className="drop-target"
      onDragEnter={handleDragEnter}
      onDragOverCapture={handleDragOver}
      onDragExit={handleDragExit}

    >
      <h4>Drag here to to mark as done </h4>
    </div>
  );
}
export default DropItem;
