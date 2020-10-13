import React, { useState, createContext, useContext } from "react";

const ItemsContext = createContext();
const useItemsContext = useContext(ItemsContext) 


const UseMarkDone = ({ children }) => {
  
  return (
    <ItemsContext.Provider value={markItemAsDone}>
      {children}
    </ItemsContext.Provider>
  );
};

export default UseMarkDone;
