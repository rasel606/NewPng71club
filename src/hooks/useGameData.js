// hooks/useGameData.js
import { useState, useEffect } from 'react';

export const useGameData = (initialUrl = "http://localhost:5000/api/games/New-table-Games-with-Providers") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchGameData = async (url = initialUrl) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log(result)
      setData(result.data);
      
      // Set initial active state
      if (result.length > 0) {
        setActive(result[0]?.category);
        setActiveIndex(0);
      }
      
      return result;
    } catch (err) {
      console.error("Error fetching game data:", err);
      setError("গেম ডেটা লোড করতে সমস্যা হচ্ছে");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);



    useEffect(() => {
      if (data.length > 0) {
        setActive(data[0]?.category);
        setActiveIndex(0); // Reset index when data changes
      }
    }, [data]);

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    setActive(item ? item : data[0]?.category?.uniqueProviders);
  };

  const refetch = () => {
    return fetchGameData();
  };

  const setActiveCategory = (categoryName) => {
    const categoryIndex = data.findIndex(
      item => item?.category?.name === categoryName
    );
    if (categoryIndex !== -1) {
      setActiveIndex(categoryIndex);
      setActive(data[categoryIndex]?.category);
    }
  };

  return {
    data,
    loading,
    error,
    active,
    activeIndex,
    handleItemClick,
    setActiveCategory,
    refetch,
    setActive,
    setActiveIndex
  };
};