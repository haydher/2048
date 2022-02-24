import { createGlobalStyle } from "styled-components";

export const GlobalComponents = createGlobalStyle`
* {
 padding: 0;
 margin: 0;
 font-family: "Montserrat", sans-serif;
}

a:link,
 a:visited,
 a:hover,
 a:active {
  text-decoration: none;
  color: black;
 }

.App {
 display: flex;
 flex-direction: column;
}

`;
