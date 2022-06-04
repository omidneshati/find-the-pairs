import Image from "next/image";
import React, { FC, useContext, useState } from "react";
import gameInfo from "../context/gameContext";
import TCard from "../types/card";
import { TPick, TSVG } from "../types/gameInfo";

const isExist = (
  selected: TPick,
  foundPairs: string[],
  pick: { name: string; id: number }
): boolean => {
  const isSelected = selected.find(
    (el) => el.name === pick.name && el.id === pick.id
  );
  const isFoundPair = foundPairs.find((el) => el === pick.name);
  if (isSelected || isFoundPair) {
    return true;
  }
  return false;
};

const Card: FC<TSVG> = ({ id, name, file }) => {
  const { setSelected, foundPairs, selected } = useContext(gameInfo);

  return (
    <button
      disabled={isExist(selected, foundPairs, { name, id })}
      // className="relative w-full h-full mx-auto bg-transparent bg-gray-200 rounded-md aspect-square"
      className="w-full h-full bg-transparent rounded-md aspect-square"
      style={{
        perspective: "1000px",
      }}
      onClick={() => {
        setSelected((v) => {
          return [...v, { name, id }];
        });
      }}
    >
      <div
        className="relative w-full h-full text-center transition-transform duration-300 "
        style={{
          transformStyle: "preserve-3d",
          transform:
            // selected.includes({ name, id }) || foundPairs.includes({ name, id })
            isExist(selected, foundPairs, { name, id })
              ? "rotateY(180deg)"
              : "",
        }}
      >
        <div
          className="absolute inset-0 bg-gray-300 rounded-lg"
          style={{ backfaceVisibility: "hidden" }}
        />
        <div
          className="absolute inset-0 w-full h-full bg-gray-300 rounded-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image src={file} layout="fill" alt={name} priority={true} />
        </div>
      </div>
    </button>
  );
};

export default Card;
