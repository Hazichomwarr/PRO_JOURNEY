import { useState } from "react";

const FIRST = "X";
const SECOND = "O";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (board) => {
  for (let [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

function hasValue(el) {
  return el !== null;
}

export function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState(FIRST);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameWinner, setGameWinner] = useState(null);

  const handleClick = (idx) => {
    if (board[idx] || isGameFinished) return; // don't overwrite

    const updatedBoard = [...board];
    updatedBoard[idx] = nextPlayer;
    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);

    if (winner) {
      setGameWinner(winner);
      setIsGameFinished(true);
      return;
    }
    if (updatedBoard.every(hasValue)) {
      setIsGameFinished(true);
      setGameWinner(null);
      return;
    } else setNextPlayer(nextPlayer === FIRST ? SECOND : FIRST);
  };
  const isDraw = gameWinner === null;
  const msg = isGameFinished
    ? isDraw
      ? `It's a Draw!`
      : `🎉 Winner: ${gameWinner}!`
    : `Next Player: ${nextPlayer}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setNextPlayer(FIRST);
    setIsGameFinished(false);
    setGameWinner(null);
  };

  return (
    <main>
      <p className="message">{msg}</p>

      <article className="board">
        {board.map((value, idx) => (
          <button
            key={idx}
            className="square"
            onClick={() => handleClick(idx)}
            disabled={!!value || null}
          >
            {value}
          </button>
        ))}
      </article>

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </main>
  );
}
