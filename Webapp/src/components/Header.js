import React from "react";
import { Link } from "react-router-dom";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import DarkMode from "../hooks/DarkMode";

const Header = () => {
  const [setTheme, colorTheme] = DarkMode();
  return (
    <div className="absolute container flex items-center mx-auto left-0 right-0 py-4 justify-between text-xl  sm:text-lg px-10 dark:bg-dPrimary dark:text-primaryC">
      <div className="">
        <h1 className="font-bold">Gestify.</h1>
      </div>
      <div className="flex items-center">
        <a
          href="https://gestify.netlify.app/"
          className="cursor-pointer link link-underline link-underline-black"
        >
          Guide
        </a>
        <Link
          to="/about"
          className="ml-5 cursor-pointer link link-underline link-underline-black"
        >
          About
        </Link>
        <div className="pl-20 sm:pl-8" onClick={() => setTheme(colorTheme)}>
          {colorTheme === "light" ? <BsSunFill /> : <BsFillMoonFill />}
        </div>
      </div>
    </div>
  );
};

export default Header;
