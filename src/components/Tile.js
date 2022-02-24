import React from "react";

export const Tile = ({ elem, posIndex, index }) => {
 return (
  <div
   id="childFill"
   className={`tile${elem.number}`}
   style={{
    //  transform: `translate(${posIndex[index]?.left}px, ${posIndex[index]?.top}px)`,
    top: `${posIndex[index]?.top}px`,
    left: `${posIndex[index]?.left}px`,
   }}
  >
   {elem.fill && elem.number}
   {/* {console.log("posIndex", posIndex)} */}
   {elem.oldIndex !== elem.id - 1 && console.log("elem moved", elem.oldIndex, elem.id - 1)}
  </div>
 );
};
