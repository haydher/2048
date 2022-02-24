import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { GameContainer } from "./components/GameContainer";
import { GameHeader } from "./components/GameHeader";
import { GlobalComponents } from "./components/styles/GlobalComponents";
import { darkTheme } from "./components/styles/Theme";
import { gameInit, updateBlock } from "./utils";

/*

Add state to hold highest score
use local storage to save the score
update score on both current and highest if current score is higher than highest

** pass the state in the overlay **

add overlay to show how to play the game

fix scrolling issue when arrow keys are pressed

*/

const App = () => {
 // holds the data for game logic
 const [arr, setArr] = useState([]);

 // checks if the user has pressed any key yet
 const [start, setStart] = useState(false);

 // track score of user
 const [userScore, setUserScore] = useState(0);

 // hold the state of game, if no more possible moves left, set to true
 const [endGame, setEndGame] = useState(false);

 const handleReset = () => {
  setArr(gameInit());
  setEndGame(false);
 };

 useEffect(() => {
  // if first render, then initialize the game
  arr.length <= 0 && setArr(gameInit());

  // track the keypress to move tiles
  window.addEventListener("keydown", handleKeyDown);

  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [arr]);

 const handleKeyDown = (event) => {
  setStart(true);

  if (endGame) return;

  switch (event.keyCode) {
   case 37: // left || A
   case 65:
    updateBlock(arr, setArr, setEndGame, "left");
    break;
   case 38: // up || W
   case 87:
    updateBlock(arr, setArr, setEndGame, "up");
    break;
   case 39: // right || D
   case 68:
    updateBlock(arr, setArr, setEndGame, "right");
    break;
   case 40: // down || S
   case 83:
    updateBlock(arr, setArr, setEndGame, "down");
    break;
   default:
    console.log(`Default`);
  }
 };

 return (
  <ThemeProvider theme={darkTheme}>
   <GlobalComponents />
   <div className="App">
    <GameHeader score={userScore} />
    <GameContainer arr={arr} start={start} endGame={endGame} handleReset={handleReset} />
    <Button onClick={handleReset} />
   </div>
  </ThemeProvider>
 );
};

export default App;
