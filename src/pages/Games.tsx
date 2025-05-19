import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const games = [
  {
    title: 'Тетрис',
    description: 'Классическая игра, где нужно собирать линии из падающих фигур.',
    image: '/games/tetris.png',
    link: '/games/tetris',
    icon: '🎮',
  },
  {
    title: 'Сапер',
    description: 'Найдите все мины, не подрываясь. Используйте логику и внимательность.',
    image: '/games/minesweeper.png',
    link: '/games/minesweeper',
    icon: '💣',
  },
  {
    title: 'Змейка',
    description: 'Управляйте змейкой, собирайте еду и не врезайтесь в стены или себя.',
    image: '/games/snake.png',
    link: '/games/snake',
    icon: '🐍',
  },
];

export default function Games() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Игры</h1>
          <p className="text-xl text-gray-600">
            Выберите игру и начните играть прямо сейчас!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{game.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {game.title}
                </h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <Link
                  to={game.link}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 inline-block w-full text-center"
                >
                  Играть
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 