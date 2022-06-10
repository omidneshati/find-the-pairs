import { TPick } from "../types/gameInfo";

const allEqual = (arr: TPick, numberOfPairs: number): boolean => {
  const r = arr
    .slice(0, numberOfPairs)
    .every((val) => val.name === arr[0].name);
  return r;
};
export default allEqual;
