import React, { FC, useEffect, useMemo, useState } from "react";
import Board from "../components/Board";
import GameSection from "../components/game/GameSection";
import GameOptions from "../components/game/GameOptions";
import { lowerNumber } from "../data";
import gameInfo from "../context/gameContext";
import { TGameContext, TPick, TSVGArray } from "../types/gameInfo";
import spliceNumberOfCards from "../utils/spliceNumberOfCards";
import makePairs from "../utils/makePairs";
import shuffle from "../utils/shuffle";
import contextToArray from "../utils/contextToArray";
import allEqual from "../utils/allEqual";

const reqAlphabet = require.context("../assets/alphabet", true);
const reqAnimal = require.context("../assets/animal", true);
const reqFruit = require.context("../assets/fruit", true);

const Home: FC = () => {
  const [cards, setCards] = useState<TSVGArray>();
  const [start, setStart] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState<number>(lowerNumber);
  const [numberOfPairs, setNumberOfPairs] = useState<number>(2);
  const [cardsKind, setCardsKind] = useState<string>("fruit");
  const [selected, setSelected] = useState<TPick>([]);
  const [foundPairs, setFoundPairs] = useState<TPick>([]);

  const svgs = useMemo(() => {
    if (cardsKind === "alphabet") return contextToArray(reqAlphabet);
    if (cardsKind === "animal") return contextToArray(reqAnimal);
    return contextToArray(reqFruit);
  }, [cardsKind]);

  // const cards = useMemo(() => {
  // }, [numberOfCards, numberOfPairs, svgs]);

  useMemo(() => {
    const slicedSVG = spliceNumberOfCards(numberOfPairs, svgs, numberOfCards);
    const newSvgs = makePairs(numberOfPairs, slicedSVG);
    console.log("le", newSvgs.length);
    setCards(shuffle(newSvgs));
  }, [numberOfCards, numberOfPairs, svgs]);

  useEffect(() => {
    if (selected.length > numberOfPairs) {
      if (allEqual(selected)) {
        setFoundPairs((v) => [...v, selected[0]]);
        console.log("foundPairs", foundPairs);
      }
      // setTimeout(() => {
      setSelected((v) => v.slice(numberOfPairs));
      // }, );
      console.log("empty setSelected", selected);
    }
  }, [foundPairs, numberOfPairs, selected]);

  // useMemo(() => {
  //   if (selected.length >= numberOfPairs) {
  //   }
  // }, [numberOfPairs, selected.length]);
  console.log("selected: ", selected);
  console.log("foundPairs", foundPairs);
  console.log("empty setSelected", selected);
  // const svgs = (() => {})();
  // const svgs = contextToArray(svgObj);
  // if (pairs === 3) {
  //   if (svgs.length * 3 > number) svgs.splice(number / 3, svgs.length);
  // } else if (svgs.length * 2 > number) svgs.splice(number / 2, svgs.length);

  // const newSvgs = [...svgs];
  // if (pairs === 3) newSvgs.push(...svgs);
  // newSvgs.push(...svgs);

  // let shuffledSvgs = newSvgs
  //   .map((value) => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value);

  const ContextValue: TGameContext = {
    cards,
    start,
    setStart,
    numberOfCards,
    setCardsKind,
    setNumberOfCards,
    setNumberOfPairs,
    cardsKind,
    numberOfPairs,
    selected,
    setSelected,
    foundPairs,
    setFoundPairs,
  };
  return (
    <>
      <WannaPlay />
      <gameInfo.Provider value={ContextValue}>
        {!start ? (
          <GameOptions />
        ) : (
          // <div className="grid min-h-screen gap-3 p-2 place-content-center md:p-8">
          // </div>
          <GameSection />
        )}
      </gameInfo.Provider>
    </>
  );
};

const WannaPlay = () => {
  const [wannaPlay, setWannaPlay] = useState<boolean>(false);
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden transition-all duration-500 ease-out bg-red-300"
      style={wannaPlay ? { bottom: "100%", top: "-100%" } : {}}
    >
      <button
        className="w-2/3 text-4xl rounded-lg text-rose-900 md:text-6xl md:w-1/3 h-1/6 bg-sky-300 animate-pulse"
        onClick={() => setWannaPlay(true)}
      >
        Wanna Play ?!
      </button>
    </div>
  );
};

export default Home;
