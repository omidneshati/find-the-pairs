const spliceNumberOfCards = (pairs: number, svgs: any[], number: number) => {
  if (svgs.length > number) {
    const newSvgs = svgs.slice(0, number / pairs);
    console.log("sp eq", newSvgs);
    return newSvgs;
  }
  console.log("sp", svgs);
  if (svgs.length * pairs > number) {
    const newSvgs = svgs.slice(0, number / pairs);
    console.log("sp big", newSvgs);
    return newSvgs;
  }
};

export default spliceNumberOfCards;
