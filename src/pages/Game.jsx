import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameMode = location.state?.gameMode || "pvp";
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const getComputerMove = (currentBoard) => {
    const availableMoves = currentBoard
      .map((square, index) => (square === null ? index : null))
      .filter((square) => square !== null);

    const testWinningMove = (player) => {
      for (const move of availableMoves) {
        const boardCopy = [...currentBoard];
        boardCopy[move] = player;
        const result = calculateWinner(boardCopy);
        if (result?.winner) {
          return move;
        }
      }
      return null;
    };

    const winningMove = testWinningMove("O");
    if (winningMove !== null) return winningMove;

    const blockingMove = testWinningMove("X");
    if (blockingMove !== null) return blockingMove;

    if (availableMoves.includes(4)) return 4;

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  useEffect(() => {
    if (gameMode === "cpu" && !xIsNext && !calculateWinner(board)) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(board);
        if (computerMove !== null) {
          const newBoard = [...board];
          newBoard[computerMove] = "O";
          setBoard(newBoard);
          setXIsNext(true);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, board, gameMode]);

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i] || (!xIsNext && gameMode === "cpu")) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine(null);
  };

  const result = calculateWinner(board);
  const winner = result?.winner;
  const isDraw = !winner && board.every((square) => square);

  // Update winning line when there's a winner
  useEffect(() => {
    setWinningLine(result?.line || null);
  }, [result]);

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-indigo-600">
        {gameMode === "pvp" ? "Player vs Player" : "Player vs Computer"}
      </h2>
      <div className={`text-xl sm:text-2xl mb-3 sm:mb-4 font-bold ${
        winner 
          ? 'text-emerald-600 animate-bounce' 
          : isDraw 
          ? 'text-amber-600' 
          : 'text-indigo-600'
      }`}>
        {status}
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {board.map((square, i) => (
          <button
            key={i}
            className={`w-20 h-20 sm:w-24 sm:h-24 bg-white/80 backdrop-blur-sm border-3 sm:border-4 
              text-3xl sm:text-4xl font-bold 
              flex items-center justify-center transition-all duration-200 
              ${!square && 'hover:bg-white hover:border-indigo-400'} 
              ${winningLine?.includes(i) 
                ? 'bg-emerald-50 border-emerald-400 shadow-emerald-200' 
                : 'border-indigo-200'
              }
              ${square === 'X' 
                ? 'text-indigo-600' 
                : square === 'O' 
                ? 'text-rose-600' 
                : ''
              }
              transform hover:scale-105 active:scale-95
              animate-appear shadow-lg hover:shadow-xl
              rounded-lg sm:rounded-xl`}
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white 
            px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-indigo-600 hover:to-indigo-700
            transition-all duration-200 transform hover:scale-105 active:scale-95
            text-sm sm:text-base font-bold shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          Reset Game
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white 
            px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-gray-600 hover:to-gray-700
            transition-all duration-200 transform hover:scale-105 active:scale-95
            text-sm sm:text-base font-bold shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          Change Mode
        </button>
      </div>
    </div>
  );
};

export default Game; 