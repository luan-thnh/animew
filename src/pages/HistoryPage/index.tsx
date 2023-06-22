import animeApi from 'api/animeApi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IErrorMessage {
  status?: string;
  message?: string;
}

const HistoryPage = () => {
  const [animeHistory, setAnimeHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState<IErrorMessage>({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await animeApi.getAnimeHistory();

        console.log(res.data);
      } catch (error) {
        if (error) setErrorMessage(error);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    if (errorMessage.message === 'User ID not found') {
      navigate('/login');
    }
  });
  console.log(errorMessage);

  return <div>Search page</div>;
};

export default HistoryPage;
