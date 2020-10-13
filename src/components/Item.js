import React from "react";
import { itemTypes } from "../dnd/items";
import { useDrag } from "react-dnd";
const Item = ({ data }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: itemTypes.TODO,
      id: data.id,
    },
    begin: (moniror) => {
      console.log(`item of id ${data.id} is being dragged`);
      console.log(moniror.getSourceClientOffset());
      console.log(moniror.getInitialClientOffset());
    },
    end: (item, monitor) => {
      console.log(item.type);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={isDragging ? "output-item-dragged" : "output-item"}
    >
      <h4>{data.text}</h4>
    </div>
  );
};

export default Item;
