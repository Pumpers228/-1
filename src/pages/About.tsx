import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Обо мне</h1>
          <p className="text-xl text-gray-600">
            Узнайте больше о моем опыте и навыках
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Мой путь</h2>
            <p className="text-gray-600 mb-4">
              Здесь вы можете рассказать о своем профессиональном пути, образовании и опыте.
            </p>
            <p className="text-gray-600">
              Добавьте информацию о своих достижениях, целях и стремлениях.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Навыки</h2>
            <div className="space-y-4">
              {[
                { name: 'Веб-разработка', level: 90 },
                { name: 'UI/UX Дизайн', level: 85 },
                { name: 'JavaScript', level: 95 },
                { name: 'React', level: 90 },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-gray-900">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-900 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Интересы</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['🎮 Игры', '📚 Книги', '🎨 Дизайн', '💻 Программирование'].map((interest) => (
              <div
                key={interest}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-900 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {interest}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 