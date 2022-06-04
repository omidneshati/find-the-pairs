const makePairs = (pairs: number, svgs: any[]) => {
  // let newSvgs = [...svgs, ...svgs];
  // if (pairs > 2) newSvgs.push(...svgs);
  console.log("old", svgs);
  let newSvgs = [];
  for (let i = 0; i < pairs; i++) {
    newSvgs.push(...svgs);
  }
  console.log("pair", newSvgs);
  console.log("pair n", pairs);
  return newSvgs;
};

export default makePairs;
