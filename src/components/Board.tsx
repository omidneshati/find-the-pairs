import React, { FC, useContext, useEffect, useState } from "react";
import Card from "./Card";
import gameContext from "../context/gameContext";

const Board: FC = () => {
  const { numberOfCards, cards } = useContext(gameContext);

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <div className="flex items-center h-full">
      <div
        className={`max-h-full w-full gap-1 md:gap-3 grid grid-flow-row auto-rows-fr md:grid-flow-col md:auto-rows-auto md:auto-cols-fr place-items-center  `}
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
        {cards.map((item) => {
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
