import { TPick } from "../types/gameInfo";

const allEqual = (arr: TPick): boolean =>
  arr.every((val) => val.name === arr[0].name);

export default allEqual;
