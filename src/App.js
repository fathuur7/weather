import React, { useState } from 'react';
import SearchFilters from './components/WeatherDashboard/SearchFilters';
import WeatherList from './components/WeatherDashboard/WeatherList';
import CloudAnimation from './components/WeatherDashboard/CloudAnimation';
import useWeatherData from './components/WeatherDashboard/hooks/useWeatherData';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const { data, error, filteredDays, filterDays } = useWeatherData(searchTerm, minTemp, maxTemp);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center justify-start p-4 md:p-8">
      {/* Cloud Animation Container */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60">
        <CloudAnimation data={data} />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Glass Effect Card */}
        <div className="backdrop-blur-md bg-white/80 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 border border-white/20">
          {/* Header Section with enhanced styling */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weather Dashboard
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
                Real-time weather data for locations around the city Surabaya
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white/50 p-6 rounded-2xl shadow-inner">
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              minTemp={minTemp}
              setMinTemp={setMinTemp}
              maxTemp={maxTemp}
              setMaxTemp={setMaxTemp}
              onFilter={filterDays}
            />
          </div>

          {/* Weather List Section */}
          <div className="mt-8">
            <WeatherList 
              error={error} 
              filteredDays={filteredDays} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-sm">
          Weather data updated in real-time
        </div>
      </div>
    </div>
  );
};

export default App;