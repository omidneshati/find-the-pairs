import React, { useMemo, useState } from "react";
import Board from "../components/Board";
import Card from "../components/Card";

const Home = () => {
  const [start, setStart] = useState(false);
  const lowerNumber = 24;
  const [number, setNumber] = useState<number>(lowerNumber);

  const optionValue = useMemo(() => {
    const totalSpace = 78;
    let values: number[] = [];
    for (let i = lowerNumber; i <= totalSpace; i++) {
      if (i % 2 === 0 && i % 3 === 0 && i % 4 === 0) values.push(i);
    }
    return values;
  }, []);
  // while (optionValue[optionValue.length - 1] <= 78) {
  return (
    <>
      index
      <select
        defaultValue={number}
        disabled={start}
        onChange={(v) => {
          setNumber(Number(v.target.value));
        }}
      >
        {/* <option value={4 * 6}>{4 * 6}</option>
        <option value={4 * 8}>{4 * 8}</option>
        <option value={4 * 10}>{4 * 10}</option> */}
        {optionValue.map((v) => {
          return <option key={v}>{v}</option>;
        })}
      </select>
      {/* <Card id="1" icon={"./"} /> */}
      <button onClick={() => setStart((v) => !v)}>start</button>
      <div className="flex items-center justify-center">
        {start && <Board type="fruit" number={number} pairs="three" />}
      </div>
    </>
  );
};

export default Home;
