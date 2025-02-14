// src/components/WeatherDashboard/hooks/useWeatherData.js
import { useState } from 'react';
import useFetchData from '../../../utils/fetchData';

export const useWeatherData = (searchTerm, minTemp, maxTemp) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [filteredDays, setFilteredDays] = useState([]);
  

  useFetchData(process.env.REACT_APP_API_URL).then(({ data, error }) => {
    if (error) {
      setError(error);
    } else {
      setData(data);
      setFilteredDays(data.days || []);
    }
    }, [searchTerm, minTemp, maxTemp]);

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