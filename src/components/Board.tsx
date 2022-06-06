import { GetStaticProps } from "next";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import TBoard from "../types/board";
import makePairs from "../utils/makePairs";
import shuffle from "../utils/shuffle";
import spliceNumberOfCards from "../utils/spliceNumberOfCards";
import contextToArray from "../utils/contextToArray";
import Card from "./Card";
import dynamic from "next/dynamic";
import Module from "module";
import { StaticImageData } from "next/image";
import gameContext from "../context/gameContext";
const reqflower = require.context("../assets/flower", true);
const reqAnimal = require.context("../assets/animal", true);
const reqFruit = require.context("../assets/fruit", true);

const Board: FC = () => {
  const { setSelected, cardsKind, numberOfCards, numberOfPairs, cards } =
    useContext(gameContext);

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  // const svgs = useMemo(() => {
  // const flower = contextToArray(reqflower);
  // const animals = contextToArray(reqAnimal);
  // const fruits = contextToArray(reqFruit);
  // if (kind === "flower") return flower;
  // if (kind === "animal") return animals;
  // return fruits;
  // }, [kind]);

  return (
    <div className="flex items-center h-full">
      <div
        // className={`h-screen grid gap-2 sm:grid-cols-8 md:grid-cols-12
        //             ${number > 40 ? "grid-cols-6" : "grid-cols-4"}
        //           `}
        className={`max-h-full w-full gap-1 md:gap-3 grid grid-flow-row auto-rows-fr md:grid-flow-col md:auto-rows-auto md:auto-cols-fr place-items-center  `}
        // className="flex flex-wrap h-full gap-3"
        style={
          matches
            ? {
                gridTemplateColumns: `repeat(${
                  numberOfCards / 12 > 4
                    ? numberOfCards / 12
                    : numberOfCards / 8
                }, minmax(0, 1fr))`,
              }
            : {
                gridTemplateRows: `repeat(${
                  numberOfCards / 12 > 4
                    ? numberOfCards / 12
                    : numberOfCards / 8
                }, minmax(0, 1fr))`,
              }
        }
      >
        {cards.map((item, index) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              file={item.file}
              path={item.path}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Board;
