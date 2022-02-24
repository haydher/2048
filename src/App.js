import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GameContainer } from "./components/GameContainer";
import { darkTheme } from "./components/styles/Theme";
import { gameInit, updateBlock } from "./utils";

const App = () => {
 // holds the data for game logic
 const [arr, setArr] = useState([]);

 // checks if the user has pressed any key yet
 const [start, setStart] = useState(false);

 const handleReset = () => setArr(gameInit());

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
  switch (event.keyCode) {
   case 37: // left || A
   case 65:
    updateBlock(arr, setArr, "left");
    break;
   case 38: // up || W
   case 87:
    updateBlock(arr, setArr, "up");

    break;
   case 39: // right || D
   case 68:
    updateBlock(arr, setArr, "right");
    break;
   case 40: // down || S
   case 83:
    updateBlock(arr, setArr, "down");
    break;
   default:
    console.log(`Default`);
  }
 };

 return (
  <ThemeProvider theme={darkTheme}>
   {/* <GlobalComponents /> */}
   <div className="App">
    <GameContainer arr={arr} start={start} />

    <button onClick={handleReset}>Reset</button>
   </div>
  </ThemeProvider>
 );
};

export default App;
