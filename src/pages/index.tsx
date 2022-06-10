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
import GameInfo from "../context/gameContext";
import { TGameContext, TPick, TSVGArray } from "../types/gameInfo";
import spliceNumberOfCards from "../utils/spliceNumberOfCards";
import makePairs from "../utils/makePairs";
import shuffle from "../utils/shuffle";
import contextToArray from "../utils/contextToArray";
import allEqual from "../utils/allEqual";
import Head from "next/head";

const reqflower = require.context("../assets/flower", true);
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
    if (cardsKind === "flower") return contextToArray(reqflower);
    if (cardsKind === "animal") return contextToArray(reqAnimal);
    return contextToArray(reqFruit);
  }, [cardsKind]);

  const newSvgs = useMemo(() => {
    const slicedSVG = spliceNumberOfCards(numberOfPairs, svgs, numberOfCards);
    const newSvgs = makePairs(numberOfPairs, slicedSVG);
    return newSvgs;
  }, [numberOfCards, numberOfPairs, svgs]);

  useMemo(() => {
    if (start) {
      setCards(shuffle(newSvgs));
    }
  }, [newSvgs, start]);

  useMemo(() => {
    if (selected.length !== 0 && selected.length > numberOfPairs) {
      if (allEqual(selected, numberOfPairs)) {
        setFoundPairs((v) => [...v, selected[0].name]);
      }
      setSelected((v) => v.slice(numberOfPairs));
    }
  }, [numberOfPairs, selected]);

  useEffect(() => {
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
      <GameInfo.Provider value={ContextValue}>
        {!start ? <GameOptions /> : <GameSection />}
      </GameInfo.Provider>
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
