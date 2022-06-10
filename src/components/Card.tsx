import Image from "next/image";
import React, { FC, useContext } from "react";
import gameInfo from "../context/gameContext";
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
  const { setSelected, foundPairs, selected, showImages } =
    useContext(gameInfo);

  return (
    <button
      disabled={isExist(selected, foundPairs, { name, id }) || showImages}
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
            isExist(selected, foundPairs, { name, id }) || showImages
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
