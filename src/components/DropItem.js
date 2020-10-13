import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { itemTypes } from "../dnd/items";
import { useDrop } from "react-dnd";

import { useItemProvider } from "./Todos";

function DropItem({ setDropItemPos }) {
  const markItemAsDone = useItemProvider();
  const [{ isOver, didDrop, dropResult }, dropRef] = useDrop({
    accept: itemTypes.TODO,
    drop: (item, monitor) => {
      markItemAsDone(item.id);
    },
    collect: (monitor) => ({
      didDrop: monitor.didDrop(),
      dropResult: monitor.getDropResult(),
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className="drop-target"
      ref={dropRef}
      style={{
        backgroundColor: isOver && "cadetBlue",
        border: isOver && "5px solid wheat",
        width: isOver && "95%",
        height: isOver && "100px",
      }}
    >
      <h4>Drag here to to mark as done </h4>
    </div>
  );
}
export default DropItem;
