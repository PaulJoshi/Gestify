import React from "react";
const About = () => {
  return <div className="container mt-14">
    <div className="flex flex-col justify-center">
      <h2 className="text-center font-bold text-xl mt-28 mb-10">About Gestify</h2>
      <p className="text-center w-1/2 mx-auto my-10">We built Gestify as part of the sixth semester project of our Bachelor of Technology degree at Rajagiri School of Engineering and Technology</p>
      <p className="text-center mb-10">View the source code at <a href="https://github.com/PaulJoshi/Gestify" className="text-purple-600 hover:text-pink-400" target="_blank" rel="noreferrer">github.com/PaulJoshi/Gestify</a></p>
      <div className="flex justify-around my-14">
        <a href="https://github.com/ednalibini" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/75474828?v=4" alt="Edna Lis" className="rounded-full w-36 shadow-xl" /></a>
        <a href="https://github.com/parvathiAmbareesh" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/75471400?v=4" alt="Parvathi Ambareesh" className="rounded-full w-36 shadow-xl" /></a>
        <a href="https://github.com/PaulJoshi" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/49583322?v=4" alt="Paul Joshi" className="rounded-full w-36 shadow-xl" /></a>
        <a href="https://github.com/peterjohnson1000" target="_blank" rel="noreferrer"><img src="https://avatars.githubusercontent.com/u/53271626?v=4" alt="Peter Johnson" className="rounded-full w-36 shadow-xl" /></a>
      </div>
    </div>
  </div>;
};

export default About;
