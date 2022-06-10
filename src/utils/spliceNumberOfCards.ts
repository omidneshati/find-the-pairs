const spliceNumberOfCards = (pairs: number, svgs: any[], number: number) => {
  if (svgs.length > number) {
    const newSvgs = svgs.slice(0, number / pairs);
    return newSvgs;
  }
  if (svgs.length * pairs > number) {
    const newSvgs = svgs.slice(0, number / pairs);
    return newSvgs;
  }
};

export default spliceNumberOfCards;
