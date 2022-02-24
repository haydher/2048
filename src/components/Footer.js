import React from "react";
import { FooterStyle } from "./styles/FootersStyle";

export const Footer = () => {
 return (
  <FooterStyle>
   <p>
    Inspired by the original{" "}
    <a href="https://play2048.co/" target="_blank" rel="noreferrer">
     2048
    </a>
   </p>
   <p>
    Made with Love &#9825; by{" "}
    <a href="http://haydher.com/" target="_blank" rel="noreferrer">
     Haydher
    </a>
   </p>
  </FooterStyle>
 );
};
