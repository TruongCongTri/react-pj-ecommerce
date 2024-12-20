import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const NotiContext = createContext();

const NotiProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(null);

  // const location = useLocation();
  // const openNoti = () => {
  //   setIsOpen(!isOpen);
  // }   
  // useEffect(() => {
  //   setIsOpen(false);
  // }, [location]);
  const closeNoti = () => {
    setIsOpen(null);
  }
  return (
    <NotiContext.Provider value={{ isOpen, setIsOpen, closeNoti }}>
      {children}
    </NotiContext.Provider>
  );
};


export default NotiProvider;
