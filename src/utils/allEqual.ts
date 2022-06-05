import { TPick } from "../types/gameInfo";

const allEqual = (arr: TPick, numberOfPairs: number): boolean => {
  const r = arr
    .slice(0, numberOfPairs)
    .every((val, index) => val.name === arr[0].name);
  console.log("eqq", r);
  return r;
};
export default allEqual;
