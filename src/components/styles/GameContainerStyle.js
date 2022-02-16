import styled from "styled-components";

export const GameContainerStyle = styled.div`
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
