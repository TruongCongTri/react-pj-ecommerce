import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import SnackBarProvider from "./contexts/SnackBarContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <BrowserRouter>
  //   <SnackBarProvider>
  //   <App />
  //   </SnackBarProvider>
  //   </BrowserRouter>
  // </StrictMode>
  <BrowserRouter>
    <SnackBarProvider>
      <App />
    </SnackBarProvider>
  </BrowserRouter>
);
