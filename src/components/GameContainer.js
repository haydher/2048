import React from "react";
import { GameContainerStyle } from "./styles/GameContainerStyle";

export const GameContainer = ({ arr }) => {
 return (
  <GameContainerStyle>
   {arr.length > 0 &&
    arr.map((elem, index) => (
     <div className="child" key={index}>
      <div className={elem.fill ? "childFill" : ""}>{elem.number}</div>
     </div>
    ))}
  </GameContainerStyle>
 );
};
