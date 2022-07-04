import React from "react";
import { Link } from "react-router-dom";
import Data from "./data.json";
const Herotwo = () => {
  console.log({ Data });
  return (
    <div className="pt-40 h-screen flex items-center justify-center flex-col">
      <div className="relative w-full max-w-lg">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="m-8 relative space-y-4">
          <div className="text-center">
            <div className="pb-10">
              <h1 className="font-extrabold text-7xl">{Data[0].heading}</h1>
              <p className="pt-5">
                {Data[0]["sub-heading-1"]} <br /> {Data[0]["sub-heading-2"]}
              </p>
            </div>
            <Link
              to="/Camera"
              className="pointer link link-underline link-underline-black py-2 px-5 bg-black text-white rounded-3xl pointer z-50 dark:bg-white dark:text-black"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div></div>
      </div>
      <div className="mx-96 pt-48 pb-16 text-center xl:mx-0 xl:px-5 smm:px-10 smm:mx-0">
        <p>{Data[0].disclaimer}</p>
      </div>
    </div>
  );
};

export default Herotwo;
