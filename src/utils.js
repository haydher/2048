const gameInit = () => {
 const initialGameArr = [];

 const initRandNum = new Set();
 for (let i = 0; i < 2; i++) {
  initRandNum.add(getRandNum(1, 16));
 }

 for (let i = 0; i < 16; i++) {
  initialGameArr.push({
   id: i + 1,
   fill: [...initRandNum].includes(i + 1) && true,
   number: Math.round(Math.random()) === 0 ? 2 : 4,
   oldIndex: i,
   lastKey: "",
  });
 }
 return initialGameArr;
};

const getRandNum = (minNum, maxNum) => {
 const min = parseInt(minNum) || 0;
 const max = parseInt(maxNum) || 30;

 // const randStrRange = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
 return Math.floor(Math.random() * (max - min + 1)) + min;
};

const updateBlock = (arr, setArr, key) => {
 // copy of the array to mutate
 const updatedArr = [...arr]; // output [{...}, {...}, {...}]

 // to see if anything changed, otherwise return without recalculating
 let changeState = false;

 // ids of active objects in the array, not the index
 let filledBoxID = [];

 // get the ids of active boxes
 arr.filter((obj) => obj.fill === true && filledBoxID.push(obj.id));

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
  let lastIndex = value - 1;

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
   updatedArr[value - 1]["number"] += updatedArr[value - 1]["number"];

   // mark the current box false
   updatedArr[id - 1]["fill"] = false;

   // mark the new box active
   updatedArr[value - 1]["fill"] = true;

   // update if array changed
   changeState = true;
  }
  // if it moved then updates boxes
  else if (lastIndex != id - 1) {
   // mark the current box false
   updatedArr[id - 1]["fill"] = false;

   // mark the new box (obj) active
   updatedArr[lastIndex]["fill"] = true;

   // update the number of obj where the box has moved to the new number
   updatedArr[lastIndex]["number"] = updatedArr[id - 1]["number"];

   // reset the oldIndex of the old box
   updatedArr[id - 1]["oldIndex"] = id - 1;

   // update if array changed
   changeState = true;
  }

  //
  //
  //
  //
  //
  updatedArr[lastIndex]["oldIndex"] = id - 1;
 }

 // if nothing changed then return without changing the state
 if (!changeState) return;

 // make a new active box
 let newBox = 1;

 // recursively keep getting new numbers if the random number is already taken by another active box
 (function getNewBox() {
  // update the variable with new number for active index
  newBox = getRandNum(1, 16);
  // if number taken, redo it
  if (updatedArr[newBox - 1].fill === true) getNewBox();
  return;
 })();

 // make a new box after move
 //  updatedArr[newBox - 1]["fill"] = true;
 //  updatedArr[newBox - 1]["number"] = Math.round(Math.random()) === 0 ? 2 : 4;

 // register the last key
 updatedArr.forEach((elem) => (elem.lastKey = key));

 // update the state with the mutated array
 setArr(updatedArr);
};

// compute how many boxes to move, logic of movements
const movementLogic = (arr, value, key, id) => {
 let lastIndex = value - 1;
 let sameValues = false;

 while (
  key === "up"
   ? value > 4
   : key === "down"
   ? value < 13
   : key === "left"
   ? value > 1 && value != 1 && value != 5 && value != 9 && value != 13
   : key === "right"
   ? value < 16 && value != 4 && value != 8 && value != 12 && value != 16
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
  if (arr[value - 1].fill === false) lastIndex = value - 1;
  // if collision, check if same number to combine
  else if (arr[value - 1].number === arr[id - 1].number) {
   sameValues = true;
   break;
  } else break;

  //
  // for left and right, check boundaries
  if (
   key === "left"
    ? value === 1 || value === 5 || value === 9 || value === 13
    : key === "right"
    ? value === 4 || value === 8 || value === 12 || value === 16
    : false
  )
   break;
 }

 // return updated array
 return [lastIndex, sameValues, value];
};

export { getRandNum, gameInit, updateBlock };
