const makePairs = (pairs: number, svgs: any[]) => {
  let newSvgs = [];
  for (let i = 0; i < pairs; i++) {
    newSvgs.push(...svgs);
  }
  return newSvgs;
};

export default makePairs;
