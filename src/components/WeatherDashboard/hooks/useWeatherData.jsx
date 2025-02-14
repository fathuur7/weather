// src/components/WeatherDashboard/hooks/useWeatherData.js
import { useState, useEffect } from 'react';

export const useWeatherData = (searchTerm, minTemp, maxTemp) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [filteredDays, setFilteredDays] = useState([]);
  
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataJson = await response.json();
        setData(dataJson);
        setFilteredDays(dataJson.days);
        console.log(dataJson);
      } catch (error) {
        setError(error.message);
      }
    };

    if (API_URL) {
      fetchData();
    } else {
      setError('API URL is not defined');
    }
  }, []);

  const filterDays = () => {
    if (!data) return;

    const filtered = data.days.filter(day => {
      const matchesSearch = day.description.toLowerCase().includes(searchTerm.toLowerCase());
      const aboveMinTemp = minTemp === '' || day.tempmax >= parseFloat(minTemp);
      const belowMaxTemp = maxTemp === '' || day.tempmin <= parseFloat(maxTemp);

      return matchesSearch && aboveMinTemp && belowMaxTemp;
    });

    setFilteredDays(filtered);
  };

  return { data, error, filteredDays, filterDays };
};

export default useWeatherData;