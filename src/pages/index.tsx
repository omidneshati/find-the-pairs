import React from "react";
import Board from "../components/Board";
import Card from "../components/Card";

const Home = () => {
  const icon = <svg></svg>;
  return (
    <div>
      index
      {/* <Card id="1" icon={"./"} /> */}
      <Board type="animal" number={30} pairs="three" />
    </div>
  );
};

export default Home;
