import React from "react";
import { itemTypes } from "../dnd/items";
import { useDrop } from "react-dnd";

import { useItemProvider } from "./Todos";

function DropItem({ setDropItemPos }) {
  const markItemAsDone = useItemProvider();
  const [{ isOver, dropResult }, dropRef] = useDrop({
    accept: itemTypes.TODO,
    drop: (item, monitor) => {
      markItemAsDone(item.id);
      console.log(`item of id ${item.id} has been dropped`);
    },
    collect: (monitor) => ({
      dropResult: monitor.getDropResult(),
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className="drop-target"
      ref={dropRef}
      style={{
        backgroundColor: isOver && "Teal",
        border: isOver && "2px solid wheat",
        width: isOver && "95%",
        height: isOver && "100px",
      }}
    >
      <h4
        style={{
          visibility: isOver && "hidden",
        }}
      >
        Drag here to to mark as done{" "}
      </h4>
    </div>
  );
}
export default DropItem;
