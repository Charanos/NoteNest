import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button className="p-4 translate flex items-center rounded-full transition opacity-0 bg-accentColor drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105">
      <FaPlay className="text-betaColor" />
    </button>
  );
};

export default PlayButton;
