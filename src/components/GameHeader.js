import React from "react";
import { GameHeaderStyle } from "./styles/GameHeaderStyle";

export const GameHeader = ({ score }) => {
 return (
  <GameHeaderStyle>
   <div className="header">
    <h1 className="title">
     <span className="tile2">2</span>
     <span className="tile0">0</span>
     <span className="tile4">4</span>
     <span className="tile8">8</span>
    </h1>
    <div className="scoreContainer">
     <div className="score">
      <p>Score</p>
      <h1>{score}</h1>
     </div>
     <div className="score">
      <p>High Score</p>
      <h1>{score}</h1>
     </div>
    </div>
   </div>

   <div className="guide">
    <p>
     <b>HOW TO PLAY:</b> Use your <b>arrow</b> or <b>A W S D</b> keys to move the tiles. Tiles with the same number{" "}
     <b>merge into one</b> when they touch. Add them up to reach <b>2048!</b>
    </p>
   </div>
  </GameHeaderStyle>
 );
};
