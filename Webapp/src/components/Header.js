import React from "react";
import { Link } from "react-router-dom";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import DarkMode from "../hooks/DarkMode";
import Data from "../data/data.json";

const Header = () => {
  const [setTheme, colorTheme] = DarkMode();
  return (
    <div className="absolute container flex items-center mx-auto left-0 right-0 py-4 justify-between text-xl  sm:text-lg px-10 dark:bg-dPrimary dark:text-primaryC">
      <div className="">
        <Link to="/" className="font-bold">
          {Data[0].heading}
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          to="/Guide"
          className="cursor-pointer link link-underline link-underline-black"
        >
          Guide
        </Link>
        <Link
          to="/About"
          className="ml-5 cursor-pointer link link-underline link-underline-black"
        >
          About
        </Link>
        <div
          className="cursor-pointer ml-20 sm:pl-8"
          onClick={() => setTheme(colorTheme)}
        >
          {colorTheme === "light" ? <BsSunFill /> : <BsFillMoonFill />}
        </div>
      </div>
    </div>
  );
};

export default Header;
