import { useState, useEffect } from "react";
import useFetchData from "../../utils/fecthData"; // Ensure correct import

export const useWeatherData = (searchTerm, minTemp, maxTemp) => {
  const { data, error } = useFetchData(process.env.REACT_APP_API_URL); // Get data & error
  const [filteredDays, setFilteredDays] = useState([]);

  useEffect(() => {
    if (!data) return;

    const filtered = data.days.filter((day) => {
      const matchesSearch = day.description.toLowerCase().includes(searchTerm.toLowerCase());
      const aboveMinTemp = minTemp === "" || day.tempmax >= parseFloat(minTemp);
      const belowMaxTemp = maxTemp === "" || day.tempmin <= parseFloat(maxTemp);

      return matchesSearch && aboveMinTemp && belowMaxTemp;
    });

    setFilteredDays(filtered);
  }, [data, searchTerm, minTemp, maxTemp]); // Run whenever dependencies change

  return { data, error, filteredDays };
};

export default useWeatherData;
