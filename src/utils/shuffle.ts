import { TSVGArray } from "../types/gameInfo";

const shuffle = (svgs: TSVGArray) => {
  return svgs
    .map((value) => ({ value, sort: Math.random() }))

    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => {
      return { ...value, id: Math.random() };
    });
};
export default shuffle;
