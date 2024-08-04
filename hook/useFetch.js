import { useState, useEffect } from 'react';
import axios from 'axios';

const rapidApiKey = process.env.RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidApi-Key': 'c0702febd0msh6ccebf1b51581f8p1f8bdajsn4be0431d63d2',
      'X-RapidApi-Host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query },
  };

  const fetchData = async () => {
    
    setIsLoading(true);
    try {
      setData([]);
      const response = await axios.request(options);
      setData(response.data.data);
      setError(false)
    } catch (error) {
      setError(error);
      console.error('Fetch error:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;