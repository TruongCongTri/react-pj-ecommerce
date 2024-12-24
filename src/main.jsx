import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SnackBarProvider from "./contexts/SnackBarContext.jsx";
import AuthenticateProvider from "./contexts/AuthenticateContext.jsx";
import "./index.css";
import App from "./App.jsx";

import Login from "./pages/authorization/Login.jsx";
import Register from "./pages/authorization/Register.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <BrowserRouter>
  //   <SnackBarProvider>
  //   <App />
  //   </SnackBarProvider>
  //   </BrowserRouter>
  // </StrictMode>
  <BrowserRouter>
    
    <AuthenticateProvider>

    
    <SnackBarProvider>
      <App />
    </SnackBarProvider>
    </AuthenticateProvider>
  </BrowserRouter>
);
