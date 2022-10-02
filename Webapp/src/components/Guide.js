import React from "react";
import hello from "../data/images/Hello.jpg"
import ily from "../data/images/ILY.jpg"
import no from "../data/images/No.jpg"
import ty from "../data/images/TY.jpg"
import yes from "../data/images/Yes.jpg"

const Guide = () => {
  return <div className="container w-3/4 mt-28">
      <div className="mb-14 rounded-xl shadow-xl border-2 flex items-center justify-evenly">
        <p className="w-1/2 text-3xl text-center md:text-2xl">Hello</p>
        <div className="bg-white w-1/2 rounded-xl flex justify-center"><img className="w-3/5" alt="Hello" src={hello} /></div>
      </div>
      <div className="mb-14 rounded-xl shadow-xl border-2 flex items-center justify-evenly">
        <p className="w-1/2 text-3xl text-center md:text-2xl">I Love You</p>
        <div className="bg-white w-1/2 rounded-xl flex justify-center"><img className="w-3/5" alt="I Love You" src={ily} /></div>
      </div>
      <div className="mb-14 rounded-xl shadow-xl border-2 flex items-center justify-evenly">
        <p className="w-1/2 text-3xl text-center md:text-2xl">No</p>
        <div className="bg-white w-1/2 rounded-xl flex justify-center"><img className="w-3/5" alt="No" src={no} /></div>
      </div>
      <div className="mb-14 rounded-xl shadow-xl border-2 flex items-center justify-evenly">
        <p className="w-1/2 text-3xl text-center md:text-2xl">Thank You</p>
        <div className="bg-white w-1/2 rounded-xl flex justify-center"><img className="w-3/5" alt="Thank You" src={ty} /></div>
      </div>
      <div className="mb-14 rounded-xl shadow-xl border-2 flex items-center justify-evenly">
        <p className="w-1/2 text-3xl text-center md:text-2xl">Yes</p>
        <div className="bg-white w-1/2 rounded-xl flex justify-center"><img className="w-3/5" alt="Yes" src={yes} /></div>
      </div>
  </div>;
};

export default Guide;
