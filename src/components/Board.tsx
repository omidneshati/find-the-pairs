import React, { FC, useEffect, useMemo } from "react";
import TBoard from "../types/board";
import Card from "./Card";
// import * as animal from "assets/animal/";
const reqSvgs = require.context("../assets/animal", true, /\.svg$/);

const Board: FC<TBoard> = ({ type, number, pairs }) => {
  useEffect(() => {
    console.log(reqSvgs.keys());
  }, []);

  const svgs = useMemo(() => {
    const svgs = reqSvgs.keys().map((path) => ({ path, file: reqSvgs(path) }));
    return svgs;
  }, [reqSvgs]);

  return <div>{}</div>;
};

export default Board;
