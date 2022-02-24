import { Button } from "./Button";
import { OverlayStyle } from "./styles/OverlayStyle";

export const Overlay = ({ handleReset }) => {
 return (
  <OverlayStyle>
   <h1>Game Over!</h1>
   <p>
    Highest score: <span>12345</span>
   </p>
   <Button onClick={handleReset} />
  </OverlayStyle>
 );
};
