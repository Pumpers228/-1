import { motion } from 'framer-motion';
import contactImage from '../assets/images/123.jpg';

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-xl text-gray-600">
            Свяжитесь со мной через любой удобный способ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Связаться со мной */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Связаться со мной</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-700">Email</h3>
                    <a href="mailto:ZhukovAless@yandex.ru" className="text-gray-900 hover:text-gray-700 transition-colors duration-300">
                      ZhukovAless@yandex.ru
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-700">Telegram</h3>
                    <a href="https://t.me/Kubizumiya2" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 transition-colors duration-300">
                      @Kubizumiya2
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Социальные сети</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-700">Twitch</h3>
                    <a href="https://www.twitch.tv/rompompom2006" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 transition-colors duration-300">
                      @rompompom2006
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-700">YouTube</h3>
                    <a href="https://www.youtube.com/@sanyasigmaguchi" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 transition-colors duration-300">
                      @sanyasigmaguchi
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Фото */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative h-full flex items-center"
          >
            <div className="h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={contactImage}
                alt="Contact"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 