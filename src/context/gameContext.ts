import { createContext } from "react";
import { TGameContext, TGameOptions, TSelectedCard } from "../types/gameInfo";

const gameContext = createContext({} as TGameContext);

export default gameContext;
