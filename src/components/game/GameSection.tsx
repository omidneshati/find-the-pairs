import React, { FC, useContext, useEffect, useState } from "react";
import gameContext from "../../context/gameContext";
import Board from "../Board";

const Timer: FC = () => {
  const [time, setTime] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setTime((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {/* <p className="flex items-center justify-center text-4xl font-semibold rotateBorder"> */}
      <div className="flex justify-center h-full row-span-1 rotateBorder">
        <span className="z-10 grid w-full m-2 text-3xl bg-gray-200 rounded-md place-content-center">
          {time}s
        </span>
      </div>
    </>
  );
};

const Turn: FC = () => {
  const [turns, setTurns] = useState(0);

  const { selected, numberOfPairs } = useContext(gameContext);

  useEffect(() => {
    if (selected.length === numberOfPairs) {
      setTurns((v) => v + 1);
    }
  }, [numberOfPairs, selected.length]);

  return (
    <div className="flex justify-center h-full row-span-1 ">
      <span className="z-10 grid w-full m-2 text-3xl bg-gray-200 rounded-md place-content-center">
        {turns}
      </span>
    </div>
  );
};
const GameSection = () => {
  const { setStart, setFoundPairs } = useContext(gameContext);
  return (
    <div className="flex flex-col h-screen gap-3 p-3">
      <div className="grid w-full gap-3 h-2/6 md:h-1/6 grid-row-3 sm:grid-cols-3 sm:grid-rows-none ">
        <button
          onClick={() => {
            setStart(false);
            setFoundPairs([]);
          }}
          className="row-span-1 text-3xl text-white rounded-md bg-slate-900"
        >
          Stop
        </button>
        <Timer />
        <Turn />
      </div>
      <div className="h-4/6 md:h-5/6">
        <Board />
      </div>
    </div>
  );
};

export default GameSection;
