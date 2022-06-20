import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Herotwo from "./components/Herotwo";
import Header from "./components/Header";
import Camera from "./components/Camera";

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-hidden bg-gray-50 dark:bg-dPrimary dark:text-primaryC">
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Herotwo />} />
            <Route path="/Camera" element={<Camera />} />
            {/* <Route path="/Hand" element={<Hand />} />
            <Route path="/Main" element={<Main />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
