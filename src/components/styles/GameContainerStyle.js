import styled from "styled-components";

export const GameContainerStyle = styled.div`
 background-color: #ab9d8f7d;
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 grid-template-rows: repeat(4, 1fr);
 grid-column-gap: 0px;
 grid-row-gap: 0px;

 margin: 200px auto;
 width: 480px;
 height: 480px;
 padding: 5px;
 border-radius: 7px;
 position: relative;
`;

export const ChildStyle = styled.div`
 height: 100px;
 width: 100px;
 margin: 10px;
 font-size: 55px;
 color: #766;
 font-family: "Arial";
 background-color: #ab9d8f7d;
 border-radius: 7px;
 transition: transform 0.5s ease 1s;

 div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  border-radius: 7px;

  /* position: absolute;
  top: 0;
  left: 0; */
 }

 .tile0 {
  background-color: #dcb;
 }
 .tile2 {
  background-color: #eee;
 }
 .tile4 {
  background-color: #eec;
 }
 .tile8 {
  color: #ffe;
  background-color: #fb8;
 }
 .tile16 {
  color: #ffe;
  background-color: #f96;
 }
 .tile32 {
  color: #ffe;
  background-color: #f75;
 }
 .tile64 {
  color: #ffe;
  background-color: #f53;
 }
 .tile128 {
  color: #ffe;
  background-color: #ec7;
  font-size: 45px;
 }
 .tile256 {
  color: #ffe;
  background-color: #ec6;
  font-size: 45px;
 }
 .tile512 {
  color: #ffe;
  background-color: #ec5;
  font-size: 45px;
 }
 .tile1024 {
  color: #fff;
  background-color: #ec3;
  font-size: 35px;
 }
 .tile2048 {
  color: #fff;
  background-color: #ec2;
  font-size: 35px;
 }
`;

export const FilledBox = styled.div``;

/*

 .animateBlock {
  position: relative;
  top: 0;
  left: 0;
  animation: animateBox 0.2s ease forwards;

  @keyframes animateBox {
   from {
    top: ${({ moveTo, oldIndex }) => moveTo[oldIndex]?.top}px;
    left: ${({ moveTo, oldIndex, newIndex, lastKeyPressed }) => {
     console.log("lastKeyPressed", lastKeyPressed);
     if (lastKeyPressed == "left") {
      console.log("newIndex", newIndex);
      console.log("oldIndex", oldIndex);
      console.log("left key - moveTo[oldIndex]?.left", moveTo[oldIndex]?.left);
      return `${moveTo[oldIndex]?.left}px`;
     } else if (lastKeyPressed == "right") {
      console.log("newIndex", newIndex);
      console.log("oldIndex", oldIndex);
      console.log("right key - moveTo[newIndex]?.left", -moveTo[newIndex]?.left);
      return `-${moveTo[newIndex]?.left}px`;
     } else return `0px`;
    }};
   }
  }
 }

 .index0 {
  position: absolute;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex0 0.2s ease forwards"};

  @keyframes animateIndex0 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) => {
     if (oldIndex === newIndex) return;
     console.log("moving first index only");
     console.log(`translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`);
     return `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`;
    }};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index1 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex1 0.2s ease forwards"};

  @keyframes animateIndex1 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index2 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex2 0.2s ease forwards"};

  @keyframes animateIndex2 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index3 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex3 0.2s ease forwards"};

  @keyframes animateIndex3 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index4 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex4 0.2s ease forwards"};

  @keyframes animateIndex4 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index5 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex5 0.2s ease forwards"};

  @keyframes animateIndex5 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index6 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex6 0.2s ease forwards"};

  @keyframes animateIndex6 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index7 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex7 0.2s ease forwards"};

  @keyframes animateIndex7 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index8 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex8 0.2s ease forwards"};

  @keyframes animateIndex8 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index9 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex9 0.2s ease forwards"};

  @keyframes animateIndex9 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index10 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex10 0.2s ease forwards"};

  @keyframes animateIndex10 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index11 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex11 0.2s ease forwards"};

  @keyframes animateIndex11 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index12 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex12 0.2s ease forwards"};

  @keyframes animateIndex12 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index13 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex13 0.2s ease forwards"};

  @keyframes animateIndex13 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index14 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex14 0.2s ease forwards"};

  @keyframes animateIndex14 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }
 .index15 {
  position: absolute;
  top: 0;
  left: 0;
  animation: ${({ oldIndex, newIndex }) => oldIndex !== newIndex && "animateIndex15 0.2s ease forwards"};

  @keyframes animateIndex15 {
   from {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[oldIndex]?.left}px, ${moveTo[oldIndex]?.top}px)`};
   }
   to {
    transform: ${({ moveTo, oldIndex, newIndex }) =>
     `translate(${moveTo[newIndex]?.left}px, ${moveTo[newIndex]?.top}px)`};
   }
  }
 }

*/
/* .animateBlock {
  position: relative;
  top: 0;
  left: 0;
  animation: animateBox 0.2s ease forwards;

  @keyframes animateBox {
   from {
    top: ${({ moveTo, oldIndex }) => moveTo[oldIndex]?.top}px;  
    left: ${({ moveTo, oldIndex, newIndex, lastKeyPressed }) => {
     console.log("lastKeyPressed", lastKeyPressed);
     if (lastKeyPressed == "left") {
      console.log("newIndex", newIndex);
      console.log("oldIndex", oldIndex);
      console.log("left key - moveTo[oldIndex]?.left", moveTo[oldIndex]?.left);
      return `${moveTo[oldIndex]?.left}px`;
     } else if (lastKeyPressed == "right") {
      console.log("newIndex", newIndex);
      console.log("oldIndex", oldIndex);
      console.log("right key - moveTo[newIndex]?.left", -moveTo[newIndex]?.left);
      return `-${moveTo[newIndex]?.left}px`;
     } else return `0px`;
    }};
   }
  }
 } */

/* top: ${({ moveTo, oldIndex }) => moveTo[oldIndex].top}px;
   left: ${({ moveTo, oldIndex }) => moveTo[oldIndex].left}px; */

// top: ${({ moveTo, newIndex }) => moveTo[newIndex].top}px;
// left: ${({ moveTo, newIndex }) => moveTo[newIndex].left}px;
