import "./index.css";
import Die from "./components/Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // Function to generate 10 random numbers
  function rollDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  // Create state for holding random arrays
  const [dice, setDice] = useState(() => rollDice());

  // Create a ref for focusing keyboard to New Game button
  const buttonRef = useRef(null);

  // Log gamewon
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  // Create side effect to get external DOM focus on button
  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  // Generate Die components
  const diceElements = dice.map((dieObject) => (
    <Die
      key={dieObject.id}
      value={dieObject.value}
      isHeld={dieObject.isHeld}
      hold={() => hold(dieObject.id)}
    />
  ));

  // Rool dice button event handler
  function handleRolldice() {
    setDice((oldDie) =>
      oldDie.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  // Function holding Die id
  function hold(id) {
    setDice((oldDie) =>
      oldDie.map((die) =>
        die.id == id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die
      )
    );
  }

  // Handle clik on gameWon condition
  function handleGameWonClick() {
    if (!gameWon) {
      handleRolldice();
    } else {
      setDice(rollDice());
    }
  }

  return (
    <main>
      <h1 className="title"> Tenzies Game </h1>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <div>
        <button
          ref={buttonRef}
          onClick={handleGameWonClick}
          className="roll-button"
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
