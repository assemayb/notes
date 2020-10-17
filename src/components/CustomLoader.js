import React from "react";
import { motion } from "framer-motion";
import {
  containerVariants,
  firstVariant,
  secondVariant,
  thirdVariant,
} from "../utils/framerMotion";

const CustomLoader = () => {
  return (
    <div className="loader-section">
      <motion.div
        className="loader-div"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          variants={firstVariant}
          animate="visible"
          className="loader-item"
          id="first-item"
        ></motion.div>
        <motion.div
          variants={secondVariant}
          animate="visible"
          className="loader-item"
          id="second-item"
        ></motion.div>
        <motion.div
          variants={thirdVariant}
          animate="visible"
          className="loader-item"
          id="third-item"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default CustomLoader;
