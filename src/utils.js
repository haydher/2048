const gameInit = () => {
 const initialGameArr = [];

 const initRandNum = new Set();

 while (initRandNum.size < 2) {
  initRandNum.add(getRandNum(1, 16));
 }

 for (let i = 0; i < 16; i++) {
  initialGameArr.push({
   id: i,
   fill: [...initRandNum].includes(i) && true,
   number: Math.round(Math.random()) === 0 ? 2 : 4,
   oldIndex: i,
   lastKey: "",
   newTile: true,
   tilesMerge: false,
  });
 }
 return initialGameArr;
};

const getRandNum = (minNum, maxNum) => {
 const min = parseInt(minNum) || 0;
 const max = parseInt(maxNum) || 30;

 return Math.floor(Math.random() * (max - min + 1)) + min;
};

const updateBlock = (arr, setArr, setEndGame, setUserScore, key) => {
 // keep track of user score after each move
 let userScore = 0;

 // copy of the array to mutate
 const updatedArr = [...arr]; // output [{...}, {...}, {...}]

 // to see if anything changed, otherwise return without recalculating
 let changeState = false;

 // ids of active objects in the array, not the index
 let filledBoxID = [];

 // get the ids of active boxes
 arr.filter((obj) => obj.fill === true && filledBoxID.push(obj.id));

 // set new tile to false so the tiles dont animate after pressing a key
 for (let i = 0; i < updatedArr.length; i++) {
  updatedArr[i]["newTile"] = false;
  updatedArr[i]["tilesMerge"] = false;
 }

 // sort array descending so it loops over right/down first
 if (key === "right" || key === "down") filledBoxID.sort((a, b) => b - a);

 // loop over all active boxes
 for (let i = 0; i < filledBoxID.length; i++) {
  let id = filledBoxID[i];

  // value updates / change with each while loop
  // same as id but this mutates to show updated position whereas id stays the same
  let value = id;

  // last index before the last iteration of the while loop
  // value = id of obj, starts with 1, to get index, subtract 1
  let lastIndex = value;

  // if two boxes are same, use it to combine them
  let sameValues = false;

  // compute the movements
  let [returnedLastIndex, returnedSameValues, returnedValue] = movementLogic(arr, value, key, id);

  // update the values after block moves
  lastIndex = returnedLastIndex; // int
  sameValues = returnedSameValues; // bool
  value = returnedValue; // int

  // if same numbers, then combine
  if (sameValues) {
   // combine the two boxes
   // adds its own value to itself to double to points
   updatedArr[value]["number"] += updatedArr[value]["number"];

   // update the user score
   userScore += updatedArr[value]["number"];

   // mark the current box false
   updatedArr[id]["fill"] = false;

   // mark the new box active
   updatedArr[value]["fill"] = true;

   // set the new tile for the combined tile to true to show animation
   updatedArr[value]["tilesMerge"] = true;

   // update if array changed
   changeState = true;
  }
  // if it moved then updates boxes
  else if (lastIndex != id) {
   // mark the current box false
   updatedArr[id]["fill"] = false;

   // mark the new box (obj) active
   updatedArr[lastIndex]["fill"] = true;

   // update the number of obj where the box has moved to the new number
   updatedArr[lastIndex]["number"] = updatedArr[id]["number"];

   // reset the oldIndex of the old box
   updatedArr[id]["oldIndex"] = id;

   // update if array changed
   changeState = true;
  }

  // update the index of old array
  updatedArr[lastIndex]["oldIndex"] = id;
 }

 // if nothing changed then return without changing the state
 if (!changeState) return;

 // make a new active box
 let newBox = 0;

 // recursively keep getting new numbers if the random number is already taken by another active box
 (function getNewBox() {
  // update the variable with new number for active index
  newBox = getRandNum(0, 15);
  // if number taken, redo it
  if (updatedArr[newBox].fill === true) getNewBox();
  return;
 })();

 // make a new box after move
 updatedArr[newBox]["fill"] = true;
 updatedArr[newBox]["number"] = Math.round(Math.random()) === 0 ? 2 : 4;
 updatedArr[newBox]["newTile"] = true;

 //update the user score state
 setUserScore((oldScore) => (oldScore += userScore));

 // if game is done
 if (gameOver(updatedArr)) setEndGame(true);

 // register the last key
 updatedArr.forEach((elem) => (elem.lastKey = key));

 // update the state with the mutated array
 setArr(updatedArr);
};

// compute how many boxes to move, logic of movements
const movementLogic = (arr, value, key, id) => {
 let lastIndex = value;
 let sameValues = false;

 while (
  key === "up"
   ? value > 3
   : key === "down"
   ? value < 12
   : key === "left"
   ? value > 0 && value != 0 && value != 4 && value != 8 && value != 12
   : key === "right"
   ? value < 15 && value != 3 && value != 7 && value != 11 && value != 15
   : false
 ) {
  // how many boxes to move after each loop
  value =
   key === "up"
    ? value - 4
    : key === "down"
    ? value + 4
    : key === "left"
    ? value - 1
    : key === "right"
    ? value + 1
    : value;

  // empty boxes, keep looping, store index before collision
  if (arr[value].fill === false) lastIndex = value;
  // if collision, check if same number to combine
  else if (arr[value].number === arr[id].number) {
   sameValues = true;
   break;
  } else break;

  //
  // for left and right, check boundaries
  if (
   key === "left"
    ? value === 0 || value === 4 || value === 8 || value === 12
    : key === "right"
    ? value === 3 || value === 7 || value === 11 || value === 15
    : false
  )
   break;
 }

 // return updated array
 return [lastIndex, sameValues, value];
};

// check if the game is done
const gameOver = (arr) => {
 // check if each box is filled
 const checkGameEnd = arr.every((obj) => obj.fill === true);

 let endGame = false;

 // check bottom and right only, if right side is not match, no need to check left on the next loop since its already not the same
 // return if any of the elements have a neighbor to avoid running extra loops
 if (checkGameEnd) {
  for (let i = 0; i < 16; i++) {
   if (
    (arr[i + 1]?.number === arr[i]?.number || arr[i + 4]?.number === arr[i]?.number) &&
    i !== 3 &&
    i !== 7 &&
    i !== 11
   ) {
    endGame = false;
    break;
   } else if ((i === 3 || i === 7 || i === 11) && arr[i + 4]?.number === arr[i]?.number) {
    endGame = false;
    break;
   } else if (i > 11 && arr[i + 1]?.number === arr[i]?.number) {
    endGame = false;
    break;
   } else endGame = true;
  }
 }

 return endGame;
};

// not used atm
// calculate the movement of the tiles
const getTransform = (elem, elemOffset) => {
 // since the animation takes arr for keyframes, this holds the animations
 let tempArr = [];

 if (elem.lastKey == "left")
  tempArr = [`transform: translate(${elemOffset[elem.oldIndex]?.left}px, 0px)`, `transform: translate(0px, 0px)`];
 else if (elem.lastKey == "right")
  tempArr = [`transform: translate(${-elemOffset[elem.id]?.left}px, 0px)`, `transform: translate(0px, 0px)`];
 if (elem.lastKey == "up")
  tempArr = [`transform: translate(0px, ${elemOffset[elem.oldIndex]?.top}px)`, `transform: translate(0px, 0px)`];
 else if (elem.lastKey == "down")
  tempArr = [`transform: translate(0px, -${elemOffset[elem.id]?.top}px)`, `transform: translate(0px, 0px)`];

 return tempArr;
};

export { getRandNum, gameInit, updateBlock, getTransform };
