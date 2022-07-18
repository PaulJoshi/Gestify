import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Camera from "./components/Camera";
import About from "./components/About";
import Guide from "./components/Guide";

function App() {
  return (
    <BrowserRouter>
      {/* bg-gray-50 */}
      <div className="dark:bg-dPrimary dark:text-primaryC overflow-hidden">
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Camera" element={<Camera />} />
            <Route path="/About" element={<About />} />
            <Route path="/Guide" element={<Guide />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
