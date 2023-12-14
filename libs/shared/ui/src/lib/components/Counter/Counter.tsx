import React from "react";
import HOCAuth from "../HOCAuth/HOCAuth";

const Counter = ({ val, incHandler }) => {
  const decHandler = () => {
    incHandler(val - 1);
  };

  return (
    <div>
      <button onClick={() => incHandler(val + 1)}>inc</button>
      <p>{val}</p>
      <button onClick={decHandler}>dec</button>
    </div>
  );
};

export default Counter;
