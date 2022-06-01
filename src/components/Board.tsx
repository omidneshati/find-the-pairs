import { GetStaticProps } from "next";
import React, { FC, useEffect, useMemo } from "react";
import TBoard from "../types/board";
import Card from "./Card";

const reqAlphabet = require.context("../assets/alphabet", true);
const reqAnimal = require.context("../assets/animal", true);
const reqFruit = require.context("../assets/fruit", true);

const convertToArray = (context: __WebpackModuleApi.RequireContext) => {
  // const length = context.keys().length - (context.keys().length % 4);

  // const result = [];
  // for (let i = 0; i < length; i++) {
  //   // for (let i in context.keys()) {
  //   const path = context.keys()[i];

  //   result.push({
  //     file: context(path),
  //     name: path.slice(2, -4),
  //   });
  // }
  // return result;

  return context.keys().map((path, index) => {
    return {
      path,
      file: context(path),
      name: path.slice(2, -4),
    };
  });
};

const Board: FC<
  TBoard
  // & any
> = ({ type, number, pairs }) => {
  const svgs = useMemo(() => {
    const alphabet = convertToArray(reqAlphabet);
    const animals = convertToArray(reqAnimal);
    const fruits = convertToArray(reqFruit);
    if (type === "alphabet") return alphabet;
    if (type === "animal") return animals;
    return fruits;
  }, [type]);

  // svgs.splice(svgs.length - (svgs.length % 4), svgs.length);
  if (pairs === "three") {
    if (svgs.length * 3 > number) svgs.splice(number / 3, svgs.length);
    // svgs.splice(svgs.length, number / 3 - (svgs.length - number / 3));
  } else if (svgs.length * 2 > number) svgs.splice(number / 2, svgs.length);

  const newSvgs = [...svgs];
  if (pairs === "three") newSvgs.push(...svgs);
  newSvgs.push(...svgs);

  let shuffledSvgs = newSvgs
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return (
    <div
      className={`grid gap-2 p-3 md:grid-cols-6 lg:grid-cols-8 auto-cols-min 
  ${number > 40 ? "grid-cols-6" : "grid-cols-4"}`}
    >
      {shuffledSvgs.map((item, index) => {
        return <Card key={index} id={item.name} icon={item.file} />;
      })}
    </div>
  );
};

export default Board;
