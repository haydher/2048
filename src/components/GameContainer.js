import React, { useEffect, useRef, useState } from "react";
import { ChildStyle, GameContainerStyle } from "./styles/GameContainerStyle";
import { AnimateKeyframes } from "react-simple-animate";

export const GameContainer = ({ arr, start }) => {
 // get the ref of parent element to calculate the top/left offset of each tile to later move them
 const childContainerRef = useRef(null);

 // holds the array of top/left offsets
 const [elemOffset, setElemOffset] = useState([]);
 useEffect(() => {
  let box = childContainerRef.current && childContainerRef.current.children;

  let tempArr = [];
  if (tempArr.length <= 0 && elemOffset.length <= 0) {
   for (let index = 0; index < box.length; index++) {
    tempArr.push({
     top: box[index].offsetTop,
     left: box[index].offsetLeft,
    });
   }
   setElemOffset(tempArr);
  }
 }, [childContainerRef, arr]);

 // calculate the movement of the tile
 const getTransform = (elem) => {
  // if game hasnt started yet then dont pass the animation
  if (!start) return [];

  // initially the positions of the tiles are off the screen by 60 pixels, the 120 bring them back to their original place
  // if the tile were not off the screen, they would flicker every time the tiles moved because the location would update
  // before the tiles had time to animate
  return [
   `transform: translate(${elemOffset[elem.oldIndex]?.left + 120}px, ${elemOffset[elem.oldIndex]?.top + 120}px)`,
   `transform: translate(${elemOffset[elem.id - 1]?.left + 120}px, ${elemOffset[elem.id - 1]?.top + 120}px)`,
  ];
 };
 return (
  <GameContainerStyle ref={childContainerRef}>
   {arr.length > 0 &&
    arr.map((elem, index) => (
     <ChildStyle key={index} gameStart={start} newTile={elem.newTile}>
      {elem.fill && (
       <AnimateKeyframes
        play
        fillMode="forwards"
        easeType="ease-in"
        duration={0.2}
        keyframes={getTransform(elem)}
        // keyframes={[
        //  `transform: translate(${elemOffset[elem.oldIndex]?.left + 120}px, ${elemOffset[elem.oldIndex]?.top + 120}px)`,
        //  `transform: translate(${elemOffset[index]?.left + 120}px, ${elemOffset[index]?.top + 120}px)`,
        // ]}
       >
        <div className={elem.newTile ? `childFill tile${elem.number} scaleNewTile` : `childFill tile${elem.number}`}>
         {elem.number}
        </div>
       </AnimateKeyframes>
      )}
     </ChildStyle>
    ))}
  </GameContainerStyle>
 );
};

{
 /* <div
id="childFill"
//  ref={showClass}
className={`tile${elem.number}`}
style={{
 transform: `translate(${posIndex[index]?.left}px, ${posIndex[index]?.top}px)`,
 transition: "all 1s ease",
}}
>
{elem.fill && elem.number}
</div> */
}

// arr.length > 0 &&
//      transitions((styles, elem) => (
//       <ChildStyle key={elem.id}>
//        {elem.fill && (
//         <animated.div id="childFill" ref={showClass} className={`tile${elem.number}`} style={styles}>
//          {elem.fill && elem.number}
//         </animated.div>
//        )}
//       </ChildStyle>
//      ))

/*
{
    arr.length > 0 &&
     // arr.map((elem, index) =>
     transitions((style, elem) => (
      <ChildStyle key={elem.id}>
       {elem.fill && (
        <animated.div id="childFill" ref={showClass} className={`tile${elem.number}`} style={style}>
      
         {elem.fill && elem.number}
        </animated.div>
       )}
      </ChildStyle>
     ))
    // )
   }
*/
{
 /* <GameContainerStyle ref={childContainerRef}>
   {arr.length > 0 &&
    arr.map((elem, index) => (
     <ChildStyle key={index}>
      {elem.fill && (
       <FilledBox lastKeyPressed={elem.lastKey} moveTo={posIndex} oldIndex={elem.oldIndex} newIndex={elem.id - 1}>
        <div
         id="childFill"
         ref={showClass}
         className={`tile${elem.number}`}
         style={{
          transform: `translate(${posIndex[index]?.left}px, ${posIndex[index]?.top}px)`,
         }}
        >
         {elem.fill && elem.number}
        </div>
       </FilledBox>
      )}
     </ChildStyle>
    ))}
  </GameContainerStyle> */
}
/*

import React, { useEffect, useRef, useState } from "react";
import { ChildStyle, GameContainerStyle } from "./styles/GameContainerStyle";

export const GameContainer = ({ arr }) => {
 const childContainerRef = useRef(null);

 const [posIndex, setPosIndex] = useState([]);
 useEffect(() => {
  console.log("function called in first useEffect");
  const box = childContainerRef.current && childContainerRef.current.children;

  let tempArr = [];
  if (tempArr.length <= 0 && posIndex.length <= 0) {
   for (let index = 0; index < box.length; index++) {
    //  console.log("elem.top", box[index].firstChild.getBoundingClientRect().top);
    //  console.log("elem.left", box[index].getBoundingClientRect().left);

    tempArr.push({
     top: box[index].offsetTop,
     left: box[index].offsetLeft,
    });
   }
   console.log("tempArr", tempArr);
   setPosIndex(tempArr);
  }

  window.addEventListener("keydown", handleKeyDown);

  // return () => {
  //  window.removeEventListener("keydown", handleKeyDown);
  // };
 }, [childContainerRef, arr]);
 //  }, [childContainerRef, arr]);

 //  const classNames = [
 //   "index1",
 //   "index2",
 //   "index3",
 //   "index4",
 //   "index5",
 //   "index6",
 //   "index7",
 //   "index8",
 //   "index9",
 //   "index10",
 //   "index11",
 //   "index12",
 //   "index13",
 //   "index14",
 //   "index15",
 //   "index16",
 //  ];

 const showClass = useRef(null);
 const [showClassState, setShowClass] = useState(true);

 //  useEffect(() => {
 //   console.log("function called in second useEffect");
 //   setShowClass((oldVale) => (oldVale = true));
 //   showClass.current &&
 //    setTimeout(() => {
 //     setShowClass((oldVale) => (oldVale = false));
 //    }, 200);
 //  }, [showClass, arr]);

 //  useEffect(() => {
 //   console.log("function called in third useEffect");
 //   window.addEventListener("keydown", handleKeyDown);

 //   return () => {
 //    window.removeEventListener("keydown", handleKeyDown);
 //   };
 //  }, []);

 const [lastKeyPressed, setLastKeyPressed] = useState("");
 const handleKeyDown = (event) => {
  switch (event.keyCode) {
   case 37: // left || A
   case 65:
    setLastKeyPressed((oldVal) => (oldVal = "left"));
    break;
   case 38: // up || W
   case 87:
    setLastKeyPressed((oldVal) => (oldVal = "up"));
    break;
   case 39: // right || D
   case 68:
    setLastKeyPressed((oldVal) => (oldVal = "right"));
    break;
   case 40: // down || S
   case 83:
    setLastKeyPressed((oldVal) => (oldVal = "down"));
    break;
   default:
    console.log(`Default`);
  }
 };

 return (
  <GameContainerStyle ref={childContainerRef}>
   {arr.length > 0 &&
    arr.map((elem, index) => (
     <ChildStyle
      lastKeyPressed={lastKeyPressed}
      moveTo={posIndex}
      oldIndex={elem.oldIndex}
      newIndex={elem.id - 1}
      className="child"
      key={index}
     >
      { // <div className={elem.fill ? "childFill" : elem.oldIndex !== elem.id - 1 ? "childFill fade" : ""}> }
      {elem.fill && (
        //  <div id="childFill" className={elem.oldIndex !== elem.id - 1 ? classNames[elem.id - 1] : ""}>
        <div id="childFill" ref={showClass} className={elem.oldIndex !== elem.id - 1 && showClassState ? "fade" : ""}>
         {elem.fill && elem.number}
         {
          elem.oldIndex !== elem.id - 1 && console.log("elem moved", elem.oldIndex, elem.id - 1)
          //  : console.log("nothing has moved", elem.oldIndex, elem.id - 1)
         }
         {// {elem.fill && console.log("active box", elem.oldIndex, elem.id - 1)} }
         {// {console.log("posIndex", posIndex)} }
        </div>
       )}
      </ChildStyle>
     ))}
   </GameContainerStyle>
  );
 };
 

*/
