import { motion } from 'framer-motion';
import beetleLogo from '../assets/images/beetle-logo.jpg';

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2"
    >
      <div className="relative">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
          <img 
            src={beetleLogo} 
            alt="Beetle Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-md"
        >
          <span className="text-sm font-bold text-gray-900">АЖ</span>
        </motion.div>
      </div>
    </motion.div>
  );
} 