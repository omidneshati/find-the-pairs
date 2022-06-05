import Image from "next/image";
import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { setEnvironmentData } from "worker_threads";
import gameContext from "../../context/gameContext";
import { nCards, nKinds, nPairs } from "../../data";
import { TGameOptions } from "../../types/gameInfo";

const Article: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <article className="flex flex-col w-full gap-3 md:w-36">{children}</article>
  );
};

const Label: FC<{ title: string }> = ({ title }) => {
  return (
    <label className="flex items-center justify-center w-full h-32 text-2xl text-center text-white bg-gray-900 rounded-md md:text-3xl">
      {title}
    </label>
  );
};

const OptionMenu: FC = () => {
  const {
    cardsKind,
    setCardsKind,
    numberOfCards,
    setNumberOfCards,
    numberOfPairs,
    setNumberOfPairs,
    setStart,
    setSelected,
    setFoundPairs,
    setEnd,
  } = useContext(gameContext);

  return (
    <div className="grid min-h-screen bg-gray-200 md:place-content-center">
      <div className="flex flex-col items-center w-full gap-3 p-2">
        <div className="grid w-full grid-cols-3 gap-3 ">
          <Article>
            <Label title="Kind" />
            {/* {cardsKind} */}
            {nKinds.map((v) => {
              return (
                <button
                  key={v.value}
                  value={v.value}
                  onClick={(e) =>
                    setCardsKind((e.target as HTMLButtonElement).value)
                  }
                  className={`w-full h-32 capitalize rounded-md bg-no-repeat  bg-center transition-colors duration-500
              ${cardsKind == v.value ? "bg-sky-900 text-white" : "bg-gray-50"}`}
                  style={{
                    backgroundImage: `url(${v.icon.src})`,
                    backgroundSize: "70px 70px",
                  }}
                >
                  {/* <div className="flex items-center justify-center"> */}
                  {/* <Image
                src={v.icon}
                alt={v.value}
                width={"100%"}
                height={"100%"}
                onClick={() => {
                  return;
                }}
                className="pointer-events-none"
              /> */}
                  {/* </div> */}
                </button>
              );
            })}
          </Article>
          <Article>
            <Label title="Number" />
            {nCards.map((v) => (
              <button
                key={v}
                value={v}
                onClick={(e) =>
                  setNumberOfCards(
                    Number((e.target as HTMLButtonElement).value)
                  )
                }
                className={`w-full h-32 capitalize rounded-md text-4xl font-bold transition-colors duration-500
              ${numberOfCards == v ? "bg-sky-900 text-white" : "bg-gray-50"}`}
              >
                {v}
              </button>
            ))}
          </Article>
          <Article>
            <Label title="Pairs" />
            {nPairs.map((v) => (
              <button
                key={v}
                value={v}
                onClick={(e) =>
                  setNumberOfPairs(
                    Number((e.target as HTMLButtonElement).value)
                  )
                }
                className={`w-full h-32 capitalize rounded-md text-4xl font-bold transition-colors duration-500
              ${numberOfPairs == v ? "bg-sky-900 text-white" : "bg-gray-50"}`}
              >
                {v}
              </button>
            ))}
          </Article>
        </div>
        <button
          onClick={() => {
            setStart(true);
            setEnd(false);
            setSelected([]);
            setFoundPairs([]);
          }}
          className="w-full text-3xl text-white rounded-md bg-slate-900 h-36"
        >
          start
        </button>
      </div>
    </div>
  );
};

export default OptionMenu;
