const makePairs = (pairs: number, svgs: any[]) => {
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
