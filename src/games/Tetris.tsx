import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Position = {
  x: number;
  y: number;
};

type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

const TETROMINOES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

const COLORS = {
  I: '#00f0f0',
  J: '#0000f0',
  L: '#f0a000',
  O: '#f0f000',
  S: '#00f000',
  T: '#a000f0',
  Z: '#f00000',
};

export default function Tetris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('tetrisHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const gameState = useRef({
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    currentPiece: null as { type: TetrominoType; position: Position; shape: number[][] } | null,
    nextPiece: null as TetrominoType | null,
    speed: 1000,
  });

  const generatePiece = (): TetrominoType => {
    const types: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const createPiece = (type: TetrominoType) => {
    return {
      type,
      position: { x: 3, y: 0 },
      shape: TETROMINOES[type],
    };
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    if (gameOver || isPaused) return;

    const { currentPiece } = gameState.current;
    if (!currentPiece) return;

    const key = e.key.toLowerCase();

    switch (key) {
      case 'arrowleft':
        movePiece(-1);
        break;
      case 'arrowright':
        movePiece(1);
        break;
      case 'arrowdown':
        moveDown();
        break;
      case 'arrowup':
        rotatePiece();
        break;
      case ' ':
        setIsPaused(prev => !prev);
        break;
    }
  };

  const movePiece = (dx: number) => {
    const { currentPiece, board } = gameState.current;
    if (!currentPiece) return;

    const newX = currentPiece.position.x + dx;
    if (isValidMove(currentPiece.shape, { x: newX, y: currentPiece.position.y })) {
      currentPiece.position.x = newX;
      draw();
    }
  };

  const moveDown = () => {
    const { currentPiece } = gameState.current;
    if (!currentPiece) return;

    const newY = currentPiece.position.y + 1;
    if (isValidMove(currentPiece.shape, { x: currentPiece.position.x, y: newY })) {
      currentPiece.position.y = newY;
      draw();
    } else {
      lockPiece();
    }
  };

  const rotatePiece = () => {
    const { currentPiece } = gameState.current;
    if (!currentPiece) return;

    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );

    if (isValidMove(rotated, currentPiece.position)) {
      currentPiece.shape = rotated;
      draw();
    }
  };

  const isValidMove = (shape: number[][], position: Position): boolean => {
    const { board } = gameState.current;
    return shape.every((row, dy) =>
      row.every((value, dx) => {
        const x = position.x + dx;
        const y = position.y + dy;
        return (
          value === 0 ||
          (x >= 0 && x < 10 && y < 20 && (y < 0 || board[y][x] === 0))
        );
      })
    );
  };

  const lockPiece = () => {
    const { currentPiece, board } = gameState.current;
    if (!currentPiece) return;

    currentPiece.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value !== 0) {
          const y = currentPiece.position.y + dy;
          const x = currentPiece.position.x + dx;
          if (y >= 0) {
            board[y][x] = value;
          }
        }
      });
    });

    clearLines();
    spawnPiece();
  };

  const clearLines = () => {
    const { board } = gameState.current;
    let linesCleared = 0;

    for (let y = board.length - 1; y >= 0; y--) {
      if (board[y].every(cell => cell !== 0)) {
        board.splice(y, 1);
        board.unshift(Array(10).fill(0));
        linesCleared++;
        y++;
      }
    }

    if (linesCleared > 0) {
      setScore(prev => {
        const newScore = prev + linesCleared * 100;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('tetrisHighScore', newScore.toString());
        }
        return newScore;
      });
    }
  };

  const spawnPiece = () => {
    const type = gameState.current.nextPiece || generatePiece();
    gameState.current.nextPiece = generatePiece();
    gameState.current.currentPiece = createPiece(type);

    if (!isValidMove(gameState.current.currentPiece.shape, gameState.current.currentPiece.position)) {
      setGameOver(true);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { board, currentPiece } = gameState.current;
    const cellSize = canvas.width / 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw board
    board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          ctx.fillStyle = COLORS[value as TetrominoType];
          ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
        }
      });
    });

    // Draw current piece
    if (currentPiece) {
      ctx.fillStyle = COLORS[currentPiece.type];
      currentPiece.shape.forEach((row, dy) => {
        row.forEach((value, dx) => {
          if (value !== 0) {
            const x = currentPiece.position.x + dx;
            const y = currentPiece.position.y + dy;
            if (y >= 0) {
              ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
            }
          }
        });
      });
    }
  };

  const resetGame = () => {
    gameState.current = {
      board: Array(20).fill(null).map(() => Array(10).fill(0)),
      currentPiece: null,
      nextPiece: null,
      speed: 1000,
    };
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    spawnPiece();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 300;
    canvas.height = 600;

    spawnPiece();

    window.addEventListener('keydown', handleKeyPress);
    const interval = setInterval(() => {
      if (!gameOver && !isPaused) {
        moveDown();
      }
    }, gameState.current.speed);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="section-title inline-block">Тетрис</h1>
          <div className="mt-4 flex justify-center space-x-8">
            <div className="text-xl">
              Счёт: <span className="font-bold text-commie-red">{score}</span>
            </div>
            <div className="text-xl">
              Рекорд: <span className="font-bold text-commie-red">{highScore}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="mx-auto border-4 border-commie-red rounded-lg shadow-lg"
          />
          
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Игра окончена!</h2>
                <button
                  onClick={resetGame}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Играть снова
                </button>
              </div>
            </motion.div>
          )}

          {isPaused && !gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Пауза</h2>
                <button
                  onClick={() => setIsPaused(false)}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Продолжить
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold text-commie-red mb-4">Управление:</h2>
          <p className="text-gray-600">
            ← → - перемещение
            <br />
            ↑ - поворот
            <br />
            ↓ - ускорение падения
            <br />
            Пробел - пауза
          </p>
        </div>
      </div>
    </div>
  );
} 