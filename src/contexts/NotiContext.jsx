import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const NotiContext = createContext();

const NotiProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const openNoti = () => {
    setIsOpen(!isOpen);
  }   
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <NotiContext.Provider value={{ isOpen, setIsOpen, openNoti }}>
      {children}
    </NotiContext.Provider>
  );
};


export default NotiProvider;
