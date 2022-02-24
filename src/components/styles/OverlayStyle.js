import styled from "styled-components";

export const OverlayStyle = styled.div`
 position: absolute;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-content: center;

 background-color: rgba(115, 108, 102, 0.9);
 width: 100%;
 height: 100%;

 z-index: 100;

 h1,
 p {
  padding: 16px 0;
  margin: 0 auto;
  color: white;
 }

 h1 {
  font-size: 32px;
 }

 p {
  font-weight: 600;
  font-size: 18px;

  span {
   font-weight: 700;
  }
 }
`;
