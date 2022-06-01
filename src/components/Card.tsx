import React, { FC } from "react";
import TCard from "../types/card";
const Card: FC<TCard> = ({ id, icon }) => {
  return (
    <div className="flex items-center justify-center w-20 h-20 p-2 bg-gray-200 rounded-md aspect-square">
      <svg href="" className="w-full h-full"></svg>
    </div>
  );
};

export default Card;
