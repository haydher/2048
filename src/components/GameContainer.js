import React, { useEffect, useRef, useState } from "react";
import { ChildStyle, FilledBox, GameContainerStyle } from "./styles/GameContainerStyle";

export const GameContainer = ({ arr }) => {
 const childContainerRef = useRef(null);

 const [posIndex, setPosIndex] = useState([]);
 useEffect(() => {
  const box = childContainerRef.current && childContainerRef.current.children;

  let tempArr = [];
  if (tempArr.length <= 0 && posIndex.length <= 0) {
   for (let index = 0; index < box.length; index++) {
    tempArr.push({
     top: box[index].offsetTop,
     left: box[index].offsetLeft,
    });
   }
   setPosIndex(tempArr);
  }
 }, [childContainerRef, arr]);

 const classList = [
  "index0",
  "index1",
  "index2",
  "index3",
  "index4",
  "index5",
  "index6",
  "index7",
  "index8",
  "index9",
  "index10",
  "index11",
  "index12",
  "index13",
  "index14",
  "index15",
 ];

 const showClass = useRef(null);
 const [showClassState, setShowClass] = useState(true);

 //  useEffect(() => {
 //   console.log("function called in second useEffect");
 //   setShowClass((oldVale) => (oldVale = true));
 //   showClass.current &&
 //    setTimeout(() => {
 //     setShowClass((oldVale) => (oldVale = false));
 //    }, 500);
 //  }, [showClass, arr]);

 return (
  <GameContainerStyle ref={childContainerRef}>
   {arr.length > 0 &&
    arr.map((elem, index) => (
     <ChildStyle key={index}>
      {elem.fill && (
       <div
        id="childFill"
        ref={showClass}
        className={`tile${elem.number}`}
        style={{
         //  transform: `translate(${posIndex[index]?.left}px, ${posIndex[index]?.top}px)`,
         top: `${posIndex[index]?.top}px`,
         left: `${posIndex[index]?.left}px`,
        }}
       >
        {elem.fill && elem.number}
        {/* {console.log("posIndex", posIndex)} */}
        {/* {elem.oldIndex !== elem.id - 1 && console.log("elem moved", elem.oldIndex, elem.id - 1)} */}
       </div>
      )}
     </ChildStyle>
    ))}
  </GameContainerStyle>
 );
};

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
