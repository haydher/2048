import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Footer } from "./components/Footer";
import { GameContainer } from "./components/GameContainer";
import { GameHeader } from "./components/GameHeader";
import { Guide } from "./components/Guide";
import { Popup } from "./components/Popup";
import { GlobalComponents } from "./components/styles/GlobalComponents";
import { darkTheme } from "./components/styles/Theme";
import { gameInit, updateBlock } from "./utils";

const App = () => {
 // holds the data for game logic
 const [gameData, setGameData] = useState([]);

 // checks if the user has pressed any key yet
 const [start, setStart] = useState(false);

 // track score of user
 const [userScore, setUserScore] = useState(0);

 // track user high score
 const [highScore, setHighScore] = useState();

 // show popup
 const [popup, setPopup] = useState(localStorage.getItem("popup") === "false" ? false : true);

 // hold the state of game, if no more possible moves left, set to true
 const [endGame, setEndGame] = useState(false);

 const handleReset = () => {
  setGameData(gameInit());
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
  gameData.length <= 0 && setGameData(gameInit());

  // track the keypress to move tiles
  window.addEventListener("keydown", handleKeyDown);

  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [gameData, popup, userScore, endGame]);

 const handleKeyDown = (event) => {
  setStart(true);

  if (endGame) return;

  switch (event.keyCode) {
   case 37: // left || A
   case 65:
    updateBlock(gameData, setGameData, setEndGame, setUserScore, "left");
    event.preventDefault();
    break;
   case 38: // up || W
   case 87:
    updateBlock(gameData, setGameData, setEndGame, setUserScore, "up");
    event.preventDefault();
    break;
   case 39: // right || D
   case 68:
    updateBlock(gameData, setGameData, setEndGame, setUserScore, "right");
    event.preventDefault();
    break;
   case 40: // down || S
   case 83:
    updateBlock(gameData, setGameData, setEndGame, setUserScore, "down");
    event.preventDefault();
    break;
  }
 };

 return (
  <ThemeProvider theme={darkTheme}>
   <GlobalComponents />
   <div className="App">
    {popup && <Popup setPopup={setPopup} />}
    <GameHeader score={userScore} highScore={highScore} handleReset={handleReset} setPopup={setPopup} />
    <GameContainer gameData={gameData} start={start} score={userScore} endGame={endGame} handleReset={handleReset} />
    <Guide />
    <Footer />
   </div>
  </ThemeProvider>
 );
};

export default App;
