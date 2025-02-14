import React from 'react';
import { motion } from 'framer-motion';
import { Search, Thermometer, ThermometerSun } from 'lucide-react';

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  minTemp, 
  setMinTemp, 
  maxTemp, 
  setMaxTemp, 
  onFilter 
}) => {
  const inputVariants = {
    focus: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { 
      scale: 0.98,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <motion.div 
          className="relative"
          whileFocus="focus"
          variants={inputVariants}
        >
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search weather conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 backdrop-blur-sm"
          />
        </motion.div>
        
        {/* Min Temperature Input */}
        <motion.div 
          className="relative"
          whileFocus="focus"
          variants={inputVariants}
        >
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Thermometer size={20} />
          </div>
          <input
            type="number"
            placeholder="Min Temperature (°C)"
            value={minTemp}
            onChange={(e) => setMinTemp(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 backdrop-blur-sm"
          />
        </motion.div>
        
        {/* Max Temperature Input */}
        <motion.div 
          className="relative"
          whileFocus="focus"
          variants={inputVariants}
        >
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ThermometerSun size={20} />
          </div>
          <input
            type="number"
            placeholder="Max Temperature (°C)"
            value={maxTemp}
            onChange={(e) => setMaxTemp(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 backdrop-blur-sm"
          />
        </motion.div>
      </div>
      
      {/* Apply Filters Button */}
      <motion.button
        onClick={onFilter}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <span className="relative">Apply Filters</span>
      </motion.button>
    </motion.div>
  );
};

export default SearchFilters;