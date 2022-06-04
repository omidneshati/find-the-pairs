import { TPick } from "../types/gameInfo";

const allEqual = (arr: TPick): boolean => {
  const r = arr.slice(0, 2).every((val) => val.name === arr[0].name);
  console.log("eqq", r);
  return r;
};
export default allEqual;
