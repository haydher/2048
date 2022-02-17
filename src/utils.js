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
 const updatedArr = [...arr];
 let changeState = false;
 let filledBoxID = [];
 arr.filter((obj) => obj.fill === true && filledBoxID.push(obj.id));

 // sort array descending so it loops over right/down first
 if (key === "right" || key === "down") filledBoxID.sort((a, b) => b - a);

 for (let i = 0; i < filledBoxID.length; i++) {
  console.log("test");
  let id = filledBoxID[i];
  let value = id;
  let lastIndex = value - 1;
  let sameValues = false;

  let [returnLastIndex, returnSameValues, returnValue] = movementLogic(arr, value, key, id);
  lastIndex = returnLastIndex;
  sameValues = returnSameValues;
  value = returnValue;

  // up key
  // if (key === "up") {
  //  let [returnLastIndex, returnSameValues, returnValue] = movementLogic(arr, value, key, id);
  //  lastIndex = returnLastIndex;
  //  sameValues = returnSameValues;
  //  value = returnValue;
  // }
  // while (value > 4) {
  //  value = value - 4;
  //  // empty boxes, keep looping
  //  if (arr[value - 1].fill === false) lastIndex = value - 1;
  //  // after collision, check if same number to combine
  //  else if (arr[value - 1].number === arr[id - 1].number) {
  //   console.log("same number");
  //   sameValues = true;
  //   break;
  //  } else break;
  // }

  // down key
  // if (key === "down") {
  //  let [returnLastIndex, returnSameValues, returnValue] = movementLogic(arr, value, key, id);
  //  lastIndex = returnLastIndex;
  //  sameValues = returnSameValues;
  //  value = returnValue;
  // }
  // while (value < 13) {
  //  value = value + 4;
  //  // empty boxes, keep looping
  //  if (arr[value - 1].fill === false) lastIndex = value - 1;
  //  // after collision, check if same number to combine
  //  else if (arr[value - 1].number === arr[id - 1].number) {
  //   console.log("same number");
  //   sameValues = true;
  //   break;
  //  } else break;
  // }

  // left key
  // if (key === "left") {
  //  let [returnLastIndex, returnSameValues, returnValue] = movementLogic(arr, value, key, id);
  //  lastIndex = returnLastIndex;
  //  sameValues = returnSameValues;
  //  value = returnValue;
  // }
  // while (value > 1 && value != 1 && value != 5 && value != 9 && value != 13) {
  //  value--;
  //  if (arr[value - 1].fill === false) lastIndex = value - 1;
  //  else if (arr[value - 1].number === arr[id - 1].number) {
  //   console.log("same number");
  //   sameValues = true;
  //   break;
  //  } else break;
  //  if (value === 1 || value === 5 || value === 9 || value === 13) break;
  // }

  // left right
  // if (key === "right") {
  //  let [returnLastIndex, returnSameValues, returnValue] = movementLogic(arr, value, key, id);
  //  lastIndex = returnLastIndex;
  //  sameValues = returnSameValues;
  //  value = returnValue;
  // }

  // while (value < 16 && value != 4 && value != 8 && value != 12 && value != 16) {
  //  value++;
  //  if (arr[value - 1].fill === false) lastIndex = value - 1;
  //  else if (arr[value - 1].number === arr[id - 1].number) {
  //   console.log("same number");
  //   sameValues = true;
  //   break;
  //  } else break;
  //  if (value === 4 || value === 8 || value === 12 || value === 16) break;
  // }

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

 // updatedArr[newBox - 1]["fill"] = true;
 // updatedArr[newBox - 1]["number"] = Math.round(Math.random()) === 0 ? 2 : 4;
 setArr(updatedArr);
};

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
  console.log(`in ${key} loop`);
  console.log("value before", value);
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

  console.log("value after", value);
  // empty boxes, keep looping
  if (arr[value - 1].fill === false) lastIndex = value - 1;
  // after collision, check if same number to combine
  else if (arr[value - 1].number === arr[id - 1].number) {
   console.log("same number");
   sameValues = true;
   break;
  } else break;

  //
  //
  if (
   key === "left"
    ? value === 1 || value === 5 || value === 9 || value === 13
    : key === "right"
    ? value === 4 || value === 8 || value === 12 || value === 16
    : false
  )
   break;
 }
 console.log("lastIndex", lastIndex);
 console.log("sameValues", sameValues);
 return [lastIndex, sameValues, value];
};
export { getRandNum, gameInit, updateBlock };
