import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Жуков - Личный сайт',
    description: 'Современный персональный сайт-портфолио, разработанный с использованием React, TypeScript и Tailwind CSS. Включает в себя разделы с проектами, играми и контактной информацией.',
    image: '/projects/zhukov-site.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/yourusername/zhukov-site'
  },
  {
    title: 'GRAFFITIPEDIA',
    description: 'Дипломный проект - информационная система для изучения и каталогизации граффити. Включает базу данных работ, информацию о художниках и историю развития уличного искусства.',
    image: '/projects/graffitipedia.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://github.com/yourusername/graffitipedia'
  },
  {
    title: 'UPZhukov - Система регистрации обращений',
    description: 'Информационная система для регистрации и обработки обращений граждан в органы местного самоуправления. Включает функционал создания, отслеживания и управления обращениями.',
    image: '/projects/upzhukov.png',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    link: 'https://github.com/yourusername/upzhukov'
  }
];

export default function Portfolio() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Мои проекты</h1>
          <p className="text-xl text-gray-600">
            Здесь представлены мои последние работы и проекты
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-900 hover:text-gray-700 transition-colors duration-300"
                >
                  <span>Подробнее</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 