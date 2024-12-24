import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AuthenticateContext = createContext();

const AuthenticateProvider = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(localStorage.getItem("token"));

  return (
    <AuthenticateContext.Provider value={{ isAuthenticate, setIsAuthenticate }}>
      {children}
    </AuthenticateContext.Provider>
  );
};


export default AuthenticateProvider;
