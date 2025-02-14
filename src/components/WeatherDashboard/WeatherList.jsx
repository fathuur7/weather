import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherList = ({ error, filteredDays }) => {
  const getWeatherIcon = (iconName) => {
    const icons = {
      'clear-day': '☀️', 
      'partly-cloudy-day': '⛅',
      'cloudy': '☁️', 
      'rain': '🌧️', 
      'snow': '❄️'
    };
    return icons[iconName] || '🌈';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-lg"
      >
        <p className="font-medium">Error: {error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <AnimatePresence>
        {filteredDays.map((day, index) => (
          <motion.div
            key={day.datetime}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              translateX: 5
            }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 flex justify-between items-center"
          >
            <div className="space-y-2">
              <motion.p 
                className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                {day.datetime}
              </motion.p>
              <p className="text-gray-600 text-sm md:text-base">{day.description}</p>
            </div>

            <div className="text-right space-y-2">
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="text-4xl md:text-5xl"
              >
                {getWeatherIcon(day.icon)}
              </motion.div>
              <div className="flex items-center gap-2">
                <motion.span 
                  whileHover={{ scale: 1.1 }}
                  className="text-red-500 font-bold"
                >
                  {day.tempmax}°C
                </motion.span>
                <span className="text-gray-400">/</span>
                <motion.span 
                  whileHover={{ scale: 1.1 }}
                  className="text-blue-500 font-bold"
                >
                  {day.tempmin}°C
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeatherList;