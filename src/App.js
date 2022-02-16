import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GameContainer } from "./components/GameContainer";
import { darkTheme } from "./components/styles/Theme";
import { getRandNum, gameInit, handleKeyDown } from "./utils";

const App = () => {
 const [arr, setArr] = useState([]);

 useEffect(() => {
  arr.length <= 0 && setArr(gameInit());

  window.addEventListener("keydown", handleKeyDown);

  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [arr]);

 return (
  <ThemeProvider theme={darkTheme}>
   {/* <GlobalComponents /> */}
   <div className="App">
    <GameContainer arr={arr} />

    <button onClick={gameInit}>Reset</button>
   </div>
  </ThemeProvider>
 );
};

export default App;
