import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Die from "./components/Die";
import "./App.scss";

function App() {
  const [state, setState] = useState(randomNum());
  const [tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();

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
        setTenzies(true);
      }
    } else {
      console.log("No matching element found.");
    }
  }, [state]);

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

    console.log(frs);
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
    setTenzies(false);

    const play = state.map((el) => {
      const n = Math.ceil(Math.random() * 6);
      return { ...el, value: n, isHeld: false };
    });

    setState(play);
  }

  return (
    <>
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
              roll
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
