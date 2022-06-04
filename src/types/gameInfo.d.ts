import { Dispatch, SetStateAction } from "react";
import type TCard from "./card";

type TSVG = { path: string; name: string; file: StaticImageData; id: number };

type TSVGArray = TSVG[];

type TPick = {
  name: string;
  id: number;
}[];

interface TGameOptions {
  start: boolean;
  setStart: Dispatch<SetStateAction<boolean>>;
  cardsKind: string;
  setCardsKind: Dispatch<SetStateAction<string>>;
  numberOfCards: number;
  setNumberOfCards: Dispatch<SetStateAction<number>>;
  numberOfPairs: number;
  setNumberOfPairs: Dispatch<SetStateAction<number>>;
}

interface TSelectedCard {
  selected: TPick;
  setSelected: Dispatch<SetStateAction<TPick>>;
}

interface TGameContext extends TGameOptions, TSelectedCard {
  cards: TSVGArray;
  foundPairs: string[];
  setFoundPairs: Dispatch<SetStateAction<string[]>>;
}
