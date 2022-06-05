import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import Head from "next/head";

const reqAlphabet = require.context("../assets/alphabet", true);
const reqAnimal = require.context("../assets/animal", true);
const reqFruit = require.context("../assets/fruit", true);

const Home: FC = () => {
  const [cards, setCards] = useState<TSVGArray>();
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [numberOfCards, setNumberOfCards] = useState<number>(lowerNumber);
  const [numberOfPairs, setNumberOfPairs] = useState<number>(2);
  const [cardsKind, setCardsKind] = useState<string>("fruit");
  const [selected, setSelected] = useState<TPick>([]);
  const [foundPairs, setFoundPairs] = useState<string[]>([]);

  const svgs = useMemo(() => {
    if (cardsKind === "alphabet") return contextToArray(reqAlphabet);
    if (cardsKind === "animal") return contextToArray(reqAnimal);
    return contextToArray(reqFruit);
  }, [cardsKind]);

  // const cards = useMemo(() => {
  // }, [numberOfCards, numberOfPairs, svgs]);

  useMemo(() => {
    if (start) {
      const slicedSVG = spliceNumberOfCards(numberOfPairs, svgs, numberOfCards);
      const newSvgs = makePairs(numberOfPairs, slicedSVG);
      console.log("le", newSvgs.length);
      setCards(shuffle(newSvgs));
    }
  }, [numberOfCards, numberOfPairs, svgs, start]);

  useMemo(() => {
    if (selected.length !== 0 && selected.length > numberOfPairs) {
      if (allEqual(selected, numberOfPairs)) {
        setFoundPairs((v) => [...v, selected[0].name]);
        console.log("foundPairs", foundPairs);
      }
      setSelected((v) => v.slice(numberOfPairs));
      console.log("empty setSelected", selected);
    }
  }, [foundPairs, numberOfPairs, selected]);

  useEffect(() => {
    console.log("end", {
      cardWP: numberOfCards - numberOfPairs,
      leTP: foundPairs.length * numberOfPairs,
    });
    if (numberOfCards - numberOfPairs === foundPairs.length * numberOfPairs) {
      setShowImages(true);
      setTimeout(() => {
        setEnd(true);
      }, 1000);
      setTimeout(() => {
        setStart(false);
        setShowImages(false);
      }, 1500);
    }
  }, [foundPairs.length, numberOfCards, numberOfPairs, selected]);

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
    end,
    setEnd,
    showImages,
    setShowImages,
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
      <Head>
        <title>Find The Pair</title>
        <meta
          name="description"
          content="Made By Me --- Omid Neshati :)"
        ></meta>
      </Head>
      <Endup end={end} setEnd={setEnd} />
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

const Endup: FC<{
  end: boolean;
  setEnd: Dispatch<SetStateAction<boolean>>;
}> = ({ end, setEnd }) => {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden transition-all duration-100 ease-out bg-slate-900"
      style={!end ? { bottom: "100%", top: "-100%" } : {}}
    >
      <button
        className="w-2/3 text-3xl text-white rounded-lg bg-slate-600 md:text-4xl md:w-1/3 h-1/6 animate-pulse"
        onClick={() => {
          setEnd(false);
        }}
      >
        <p>I Think You Won!</p>
        <p>SO Wanna Play?!</p>
      </button>
    </div>
  );
};
const WannaPlay: FC = () => {
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
