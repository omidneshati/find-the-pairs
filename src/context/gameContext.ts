import { createContext } from "react";
import { TGameContext } from "../types/gameInfo";

const gameContext = createContext({} as TGameContext);

export default gameContext;
