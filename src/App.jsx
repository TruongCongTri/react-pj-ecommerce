import { useState } from "react";
import "./App.css";
import ListRoutes from "./pages/Index";

import Header from "./components/layouts/admin/Header";
import Sidebar from "./components/layouts/admin/Sidebar";

import NotiProvider from "./contexts/NotiContext.jsx";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="bg-[#F9F9FC] w-full">
          <NotiProvider>
            <Header />
          </NotiProvider>
          <ListRoutes />
        </div>
      </div>
    </>
  );
}

export default App;