import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import heroBackground from '../assets/images/hero-background.png';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackground} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Logo />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-on-dark"
          >
            Добро пожаловать на мой сайт
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-on-dark"
          >
            Здесь вы найдете мои проекты, игры и многое другое
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link
              to="/portfolio"
              className="bg-commie-red text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 text-lg"
            >
              Смотреть проекты
            </Link>
            <Link
              to="/games"
              className="bg-white text-commie-red px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-lg"
            >
              Играть в игры
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">🎮 Игры</h2>
            <p className="text-gray-900 mb-4">
              Классические игры, созданные с использованием современных технологий
            </p>
            <Link to="/games" className="inline-flex items-center text-gray-900 hover:text-commie-red hover:underline">
              Играть
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">💻 Проекты</h2>
            <p className="text-gray-900 mb-4">
              Мои работы в области веб-разработки и дизайна
            </p>
            <Link to="/portfolio" className="inline-flex items-center text-gray-900 hover:text-commie-red hover:underline">
              Смотреть
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">📞 Контакты</h2>
            <p className="text-gray-900 mb-4">
              Свяжитесь со мной для обсуждения ваших проектов
            </p>
            <Link to="/contact" className="inline-flex items-center text-gray-900 hover:text-commie-red hover:underline">
              Написать
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 