import React from "react";
const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-14 h-14 animate-spin rounded-full bg-gradient-to-r from-purple-500 via-red-500  to-green-500 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full "></div>
      </div>
    </div>
  );
};

export default Loading;
