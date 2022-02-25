import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { Footer } from "./components/Footer";
import { GameContainer } from "./components/GameContainer";
import { GameHeader } from "./components/GameHeader";
import { Guide } from "./components/Guide";
import { Popup } from "./components/Popup";
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

 // show popup
 const [popup, setPopup] = useState(localStorage.getItem("popup") === "false" ? false : true);

 // hold the state of game, if no more possible moves left, set to true
 const [endGame, setEndGame] = useState(false);

 // track user high score
 const [highScore, setHighScore] = useState();

 const handleReset = () => {
  setArr(gameInit());
  setEndGame(false);
  // update the high score in local storage
  highScore < userScore && localStorage.setItem("highScore", userScore);
  setUserScore(0);
 };

 useEffect(() => {
  // get the high score from local storage
  localStorage.getItem("highScore") != null
   ? setHighScore(parseInt(localStorage.getItem("highScore")))
   : setHighScore(0);

  // set the score as high score at the end of the game
  endGame && localStorage.setItem("highScore", userScore);

  // if first render, then initialize the game
  arr.length <= 0 && setArr(gameInit());

  // track the keypress to move tiles
  window.addEventListener("keydown", handleKeyDown);

  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [arr, popup, userScore, endGame]);

 const handleKeyDown = (event) => {
  // prevent user screen from scrolling when arrow keys are pressed
  event.preventDefault();
  setStart(true);

  if (endGame) return;

  switch (event.keyCode) {
   case 37: // left || A
   case 65:
    updateBlock(arr, setArr, setEndGame, setUserScore, "left");
    break;
   case 38: // up || W
   case 87:
    updateBlock(arr, setArr, setEndGame, setUserScore, "up");
    break;
   case 39: // right || D
   case 68:
    updateBlock(arr, setArr, setEndGame, setUserScore, "right");
    break;
   case 40: // down || S
   case 83:
    updateBlock(arr, setArr, setEndGame, setUserScore, "down");
    break;
   default:
    console.log(`Default`);
  }
 };

 return (
  <ThemeProvider theme={darkTheme}>
   <GlobalComponents />
   <div className="App">
    {popup && <Popup setPopup={setPopup} />}
    <GameHeader score={userScore} highScore={highScore} handleReset={handleReset} />
    <GameContainer arr={arr} start={start} endGame={endGame} handleReset={handleReset} />
    <Guide />
    <Footer />
   </div>
  </ThemeProvider>
 );
};

export default App;
