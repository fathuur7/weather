import { useState, useEffect } from "react";

const useFetchData = (apiUrl) => {
  const [data, setData] = useState(null);
  const [filteredDays, setFilteredDays] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is not defined");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataJson = await response.json();
        setData(dataJson);
        setFilteredDays(dataJson.days || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]); // Fetch data setiap kali API URL berubah

  return { data, filteredDays, error, loading };
};

export default useFetchData;
