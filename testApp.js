import { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./components/styles/Theme";

const ContainerStyle = styled.div`
 background-color: orange;
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 grid-template-rows: repeat(4, 1fr);
 grid-column-gap: 0px;
 grid-row-gap: 0px;

 width: 480px;

 .child {
  height: 100px;
  width: 100px;
  margin: 10px;
  border: 1px solid red;

  .childFill {
   background-color: lightblue;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
   width: 100%;
  }
 }
`;

const getRandNum = (minNum, maxNum) => {
 const min = parseInt(minNum) || 0;
 const max = parseInt(maxNum) || 30;

 // const randStrRange = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
 return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = () => {
 const [arr, setArr] = useState([]);

 const gameInit = () => {
  const temp = [];

  const tempRandNum = new Set();
  for (let i = 0; i < 2; i++) {
   tempRandNum.add(getRandNum(1, 16));
  }

  for (let i = 0; i < 16; i++) {
   temp.push({
    id: i + 1,
    fill: [...tempRandNum].includes(i + 1) && true,
    number: Math.round(Math.random()) === 0 ? 2 : 4,
   });
  }
  setArr(temp);
 };

 useEffect(() => {
  gameInit();
 }, []);

 useEffect(() => {
  window.addEventListener("keydown", handleKeyDown);

  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [arr]);

 const handleKeyDown = (event) => {
  switch (event.keyCode) {
   case 37: // left || A
   case 65:
    updateBlock(arr, "left");
    break;
   case 38: // up || W
   case 87:
    updateBlock(arr, "up");
    break;
   case 39: // right || D
   case 68:
    updateBlock(arr, "right");
    break;
   case 40: // down || S
   case 83:
    updateBlock(arr, "down");
    break;
   default:
    console.log(`Default.`);
  }
 };

 const updateBlock = (arr, key) => {
  const updatedArr = [...arr];
  let changeState = false;
  let filledBoxID = [];
  arr.filter((obj) => obj.fill === true && filledBoxID.push(obj.id));

  // sort array descending so it loops over right/down first
  if (key === "right" || key === "down") filledBoxID.sort((a, b) => b - a);

  for (let i = 0; i < filledBoxID.length; i++) {
   let id = filledBoxID[i];
   let value = id;
   let lastIndex = value - 1;
   let sameValues = false;

   // up key
   if (key === "up")
    while (value > 4) {
     value = value - 4;
     // empty boxes, keep looping
     if (arr[value - 1].fill === false) lastIndex = value - 1;
     // after collision, check if same number to combine
     else if (arr[value - 1].number === arr[id - 1].number) {
      console.log("same number");
      sameValues = true;
      break;
     } else break;
    }

   // down key
   if (key === "down")
    while (value < 13) {
     value = value + 4;
     // empty boxes, keep looping
     if (arr[value - 1].fill === false) lastIndex = value - 1;
     // after collision, check if same number to combine
     else if (arr[value - 1].number === arr[id - 1].number) {
      console.log("same number");
      sameValues = true;
      break;
     } else break;
    }

   // left key
   if (key === "left")
    while (value > 1 && value != 1 && value != 5 && value != 9 && value != 13) {
     value--;
     if (arr[value - 1].fill === false) lastIndex = value - 1;
     else if (arr[value - 1].number === arr[id - 1].number) {
      console.log("same number");
      sameValues = true;
      break;
     } else if (arr[value - 1].fill) break;
     if (value === 1 || value === 5 || value === 9 || value === 13) break;
    }

   // left right
   if (key === "right")
    while (value < 16 && value != 4 && value != 8 && value != 12 && value != 16) {
     value++;
     if (arr[value - 1].fill === false) lastIndex = value - 1;
     else if (arr[value - 1].number === arr[id - 1].number) {
      console.log("same number");
      sameValues = true;
      break;
     } else if (arr[value - 1].fill) break;
     if (value === 4 || value === 8 || value === 12 || value === 16) break;
    }

   // if it moved then updates boxes
   if (sameValues) {
    updatedArr[value - 1]["number"] = updatedArr[value - 1]["number"] + updatedArr[value - 1]["number"];
    updatedArr[id - 1]["fill"] = false;
    updatedArr[value - 1]["fill"] = true;
    changeState = true;
   }
   // if it moved then updates boxes
   else if (lastIndex != id - 1) {
    updatedArr[id - 1]["fill"] = false;
    updatedArr[lastIndex]["fill"] = true;
    updatedArr[lastIndex]["number"] = updatedArr[id - 1]["number"];
    changeState = true;
   }
  }

  // if nothing changed then return
  if (!changeState) return;

  // get a new box
  let newBox = 1;
  const getNewBox = () => {
   newBox = getRandNum(1, 16);
   if (updatedArr[newBox - 1].fill === true) getNewBox();
   return;
  };
  getNewBox();

  updatedArr[newBox - 1]["fill"] = true;
  updatedArr[newBox - 1]["number"] = Math.round(Math.random()) === 0 ? 2 : 4;
  setArr(updatedArr);
 };

 return (
  <ThemeProvider theme={darkTheme}>
   {/* <GlobalComponents /> */}
   <div className="App">
    <ContainerStyle>
     {arr.length > 0 &&
      arr.map((elem, index) => (
       <div className="child" key={index}>
        <div className={elem.fill ? "childFill" : ""}>{elem.number}</div>
       </div>
      ))}
    </ContainerStyle>
    <button onClick={gameInit}>Reset</button>
   </div>
  </ThemeProvider>
 );
};

export default App;
