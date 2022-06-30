import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Herotwo from "./components/Herotwo";
import Header from "./components/Header";
import Camera from "./components/Camera";

function App() {
  return (
    <BrowserRouter>
      {/* bg-gray-50 */}
      <div className="dark:bg-dPrimary dark:text-primaryC overflow-hidden">
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Herotwo />} />
            <Route path="/Camera" element={<Camera />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
