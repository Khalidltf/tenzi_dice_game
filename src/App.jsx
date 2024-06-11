import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Die from "./components/Die";
import { formatTime, saveBestScore } from "./utils";
import "./App.scss";

function App() {
  const [state, setState] = useState(randomNum());
  const [tenzies, setTenzies] = useState(false);
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  const { width, height } = useWindowSize();

  const { seconds, minutes, pause, reset, totalSeconds } = useStopwatch({
    autoStart: true,
  });
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

  useEffect(() => {
    function findNum(d) {
      return d.isHeld === true; // Condition to find the element
    }

    const foundElement = state.find(findNum);

    if (foundElement) {
      const value = foundElement.value;
      if (
        state.every((el) => el.isHeld) &&
        state.every((el) => el.value === value)
      ) {
        pause();
        setTenzies(true);
        saveBestScore(totalSeconds);
      }
    } else {
      console.log("No matching element found.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, totalSeconds]);

  function randomNum() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let num = Math.ceil(Math.random() * 6);
      arr.unshift({ id: nanoid(), value: num, isHeld: false });
    }

    return arr;
  }

  function handleChange() {
    const frs = state.map((el) => {
      const n = Math.ceil(Math.random() * 6);
      return el.isHeld === false ? { ...el, value: n } : el;
    });

    setNumberOfRolls((prevNum) => prevNum + 1);
    setState(frs);
  }

  function handleBackground(id) {
    const newArr = state.map((el) => {
      return el.id === id
        ? {
            ...el,
            isHeld: !el.isHeld,
          }
        : el;
    });
    setState(newArr);
  }

  const items = state.map((item) => (
    <>
      <Die
        key={item.id}
        value={item.value}
        getItem={() => handleBackground(item.id)}
        isHeld={item.isHeld}
      />
    </>
  ));

  function handleGame() {
    reset();
    setNumberOfRolls(0);
    setTenzies(false);

    const play = state.map((el) => {
      const n = Math.ceil(Math.random() * 6);
      return { ...el, value: n, isHeld: false };
    });

    setState(play);
  }

  return (
    <>
      <div className="score">
        <p>
          Time {minuteTime}:{secondTime}
        </p>
        {" - "}
        <p>
          Score&nbsp;
          {localStorage.getItem("bestScore")
            ? formatTime(localStorage.getItem("bestScore"))
            : "00:00"}
        </p>
      </div>
      <main className="container">
        {tenzies && <Confetti width={width} height={height} />}
        <div className="game__board">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice__container">{items}</div>
          {tenzies ? (
            <button onClick={handleGame} className="roll__btn">
              play
            </button>
          ) : (
            <button onClick={handleChange} className="roll__btn">
              {numberOfRolls === 1 ? " 1 roll" : numberOfRolls + " rolls"}
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
