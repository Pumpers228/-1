import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Position = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const gameState = useRef({
    snake: [{ x: 10, y: 10 }] as Position[],
    food: { x: 5, y: 5 } as Position,
    direction: 'RIGHT' as Direction,
    nextDirection: 'RIGHT' as Direction,
    gridSize: 20,
    speed: 150,
  });

  const handleKeyPress = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    const currentDirection = gameState.current.direction;
    const key = e.key.toLowerCase();

    if (key === 'arrowup' && currentDirection !== 'DOWN') {
      gameState.current.nextDirection = 'UP';
    } else if (key === 'arrowdown' && currentDirection !== 'UP') {
      gameState.current.nextDirection = 'DOWN';
    } else if (key === 'arrowleft' && currentDirection !== 'RIGHT') {
      gameState.current.nextDirection = 'LEFT';
    } else if (key === 'arrowright' && currentDirection !== 'LEFT') {
      gameState.current.nextDirection = 'RIGHT';
    } else if (key === ' ') {
      setIsPaused(prev => !prev);
    }
  };

  const generateFood = () => {
    const gridSize = gameState.current.gridSize;
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    gameState.current.food = { x, y };
  };

  const checkCollision = (head: Position) => {
    const { snake } = gameState.current;
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  };

  const wrapPosition = (pos: Position): Position => {
    const { gridSize } = gameState.current;
    return {
      x: (pos.x + gridSize) % gridSize,
      y: (pos.y + gridSize) % gridSize,
    };
  };

  const gameLoop = () => {
    if (gameOver || isPaused) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { snake, food, gridSize } = gameState.current;
    const head = { ...snake[0] };

    gameState.current.direction = gameState.current.nextDirection;

    switch (gameState.current.direction) {
      case 'UP':
        head.y--;
        break;
      case 'DOWN':
        head.y++;
        break;
      case 'LEFT':
        head.x--;
        break;
      case 'RIGHT':
        head.x++;
        break;
    }

    const wrappedHead = wrapPosition(head);

    if (checkCollision(wrappedHead)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('snakeHighScore', score.toString());
      }
      return;
    }

    snake.unshift(wrappedHead);

    if (wrappedHead.x === food.x && wrappedHead.y === food.y) {
      setScore(prev => prev + 1);
      generateFood();
    } else {
      snake.pop();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / gridSize;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw snake
    ctx.fillStyle = '#ef4444';
    snake.forEach(segment => {
      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });

    // Draw food
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(
      food.x * cellSize + 1,
      food.y * cellSize + 1,
      cellSize - 2,
      cellSize - 2
    );
  };

  const resetGame = () => {
    gameState.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 5, y: 5 },
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      gridSize: 20,
      speed: 150,
    };
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    generateFood();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 600;

    generateFood();

    window.addEventListener('keydown', handleKeyPress);
    const interval = setInterval(gameLoop, gameState.current.speed);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="section-title inline-block">Змейка</h1>
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
            Используйте стрелки для управления змейкой
            <br />
            Пробел - пауза
          </p>
        </div>
      </div>
    </div>
  );
} 