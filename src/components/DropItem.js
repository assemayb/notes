import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function DropItem() {
  const itemRef = useRef();
  useEffect(() => {
    console.log(itemRef.current.getBoundingClientRect());
  }, []);

  return (
    <motion.div ref={itemRef} className="drop-target">
      <h4>Drag here to to mark as done </h4>
    </motion.div>
  );
}
export default DropItem;
