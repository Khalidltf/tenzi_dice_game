import PropTypes from "prop-types";

import DiceOne from "../assets/images/Dice1.png";
import DiceTwo from "../assets/images/Dice2.png";
import DiceThree from "../assets/images/Dice3.png";
import DiceFour from "../assets/images/Dice4.png";
import DiceFive from "../assets/images/Dice5.png";
import DiceSix from "../assets/images/Dice6.png";

export default function Die({ value, getItem, isHeld }) {
  let imageDice;
  switch (value) {
    case 1:
      imageDice = <img src={DiceOne} alt="dice one" />;
      break;
    case 2:
      imageDice = <img src={DiceTwo} alt="dice two" />;
      break;
    case 3:
      imageDice = <img src={DiceThree} alt="dice three" />;
      break;
    case 4:
      imageDice = <img src={DiceFour} alt="dice four" />;
      break;
    case 5:
      imageDice = <img src={DiceFive} alt="dice five" />;
      break;
    case 6:
      imageDice = <img src={DiceSix} alt="dice six" />;
      break;
  }

  return (
    <div
      className="die"
      onClick={getItem}
      style={{
        // backgroundColor: isHeld && "rgb(222, 255, 174)",
        color: isHeld ? "rgb(222, 255, 174)" : "rgba(0, 0, 0, 0.1)",
      }}
    >
      {imageDice}
    </div>
  );
}

Die.propTypes = {
  value: PropTypes.number,
  getItem: PropTypes.any,
  isHeld: PropTypes.bool,
};
