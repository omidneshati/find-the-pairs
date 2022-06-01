import Image from "next/image";
import React, { FC } from "react";
import TCard from "../types/card";
const Card: FC<TCard> = ({ id, icon }) => {
  return (
    <div className="flex items-center justify-center p-2 bg-gray-200 rounded-md aspect-square">
      {/* <svg name={id} ={icon} className="w-full h-full"></svg> */}
      <Image src={icon} width={"100%"} height={"100%"} alt={id} />
    </div>
  );
};

export default Card;
