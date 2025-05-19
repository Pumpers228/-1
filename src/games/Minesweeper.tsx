import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [flags, setFlags] = useState(10);
  const [time, setTime] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const timerRef = useRef<number>();

  const BOARD_SIZE = 10;
  const MINES_COUNT = 10;

  const initializeBoard = () => {
    const newBoard: Cell[][] = Array(BOARD_SIZE)
      .fill(null)
      .map(() =>
        Array(BOARD_SIZE)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          }))
      );
    return newBoard;
  };

  const placeMines = (board: Cell[][], firstX: number, firstY: number) => {
    let minesPlaced = 0;
    const newBoard = [...board];

    while (minesPlaced < MINES_COUNT) {
      const x = Math.floor(Math.random() * BOARD_SIZE);
      const y = Math.floor(Math.random() * BOARD_SIZE);

      if (
        !newBoard[y][x].isMine &&
        !(Math.abs(x - firstX) <= 1 && Math.abs(y - firstY) <= 1)
      ) {
        newBoard[y][x].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (!newBoard[y][x].isMine) {
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (
                ny >= 0 &&
                ny < BOARD_SIZE &&
                nx >= 0 &&
                nx < BOARD_SIZE &&
                newBoard[ny][nx].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[y][x].neighborMines = count;
        }
      }
    }

    return newBoard;
  };

  const revealCell = (x: number, y: number) => {
    if (gameOver || isWon || board[y][x].isFlagged) return;

    if (isFirstClick) {
      const newBoard = placeMines(board, x, y);
      setBoard(newBoard);
      setIsFirstClick(false);
      startTimer();
    }

    const newBoard = [...board];
    if (newBoard[y][x].isMine) {
      // Game over - reveal all mines
      newBoard.forEach(row =>
        row.forEach(cell => {
          if (cell.isMine) cell.isRevealed = true;
        })
      );
      setBoard(newBoard);
      setGameOver(true);
      stopTimer();
      return;
    }

    const reveal = (x: number, y: number) => {
      if (
        x < 0 ||
        x >= BOARD_SIZE ||
        y < 0 ||
        y >= BOARD_SIZE ||
        newBoard[y][x].isRevealed ||
        newBoard[y][x].isFlagged
      ) {
        return;
      }

      newBoard[y][x].isRevealed = true;

      if (newBoard[y][x].neighborMines === 0) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            reveal(x + dx, y + dy);
          }
        }
      }
    };

    reveal(x, y);
    setBoard(newBoard);

    // Check for win
    const isWon = newBoard.every(row =>
      row.every(cell => cell.isRevealed || cell.isMine)
    );
    if (isWon) {
      setIsWon(true);
      stopTimer();
    }
  };

  const toggleFlag = (x: number, y: number) => {
    if (gameOver || isWon || board[y][x].isRevealed) return;

    const newBoard = [...board];
    if (newBoard[y][x].isFlagged) {
      newBoard[y][x].isFlagged = false;
      setFlags(prev => prev + 1);
    } else if (flags > 0) {
      newBoard[y][x].isFlagged = true;
      setFlags(prev => prev - 1);
    }
    setBoard(newBoard);
  };

  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setGameOver(false);
    setIsWon(false);
    setFlags(MINES_COUNT);
    setTime(0);
    setIsFirstClick(true);
    stopTimer();
  };

  useEffect(() => {
    setBoard(initializeBoard());
    return () => stopTimer();
  }, []);

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return 'bg-gray-200';
    if (cell.isMine) return 'bg-red-500';
    if (cell.neighborMines === 0) return 'bg-gray-100';
    return 'bg-white';
  };

  const getCellTextColor = (cell: Cell) => {
    if (!cell.isRevealed) return '';
    const colors = [
      'text-blue-500',
      'text-green-500',
      'text-red-500',
      'text-purple-500',
      'text-yellow-500',
      'text-pink-500',
      'text-gray-500',
      'text-black',
    ];
    return colors[cell.neighborMines - 1] || '';
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="section-title inline-block">Сапер</h1>
          <div className="mt-4 flex justify-center space-x-8">
            <div className="text-xl">
              Флаги: <span className="font-bold text-commie-red">{flags}</span>
            </div>
            <div className="text-xl">
              Время: <span className="font-bold text-commie-red">{time}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-10 gap-1 mx-auto w-fit">
            {board.map((row, y) =>
              row.map((cell, x) => (
                <button
                  key={`${x}-${y}`}
                  className={`w-10 h-10 ${getCellColor(cell)} border border-gray-300 flex items-center justify-center font-bold ${getCellTextColor(
                    cell
                  )}`}
                  onClick={() => revealCell(x, y)}
                  onContextMenu={e => {
                    e.preventDefault();
                    toggleFlag(x, y);
                  }}
                >
                  {cell.isFlagged && '🚩'}
                  {cell.isRevealed &&
                    !cell.isMine &&
                    cell.neighborMines > 0 &&
                    cell.neighborMines}
                  {cell.isRevealed && cell.isMine && '💣'}
                </button>
              ))
            )}
          </div>

          {(gameOver || isWon) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {isWon ? 'Победа!' : 'Игра окончена!'}
                </h2>
                <button
                  onClick={resetGame}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Играть снова
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold text-commie-red mb-4">Управление:</h2>
          <p className="text-gray-600">
            ЛКМ - открыть клетку
            <br />
            ПКМ - поставить/убрать флаг
          </p>
        </div>
      </div>
    </div>
  );
} 