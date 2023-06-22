import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function useAnimeNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [animeId, setAnimeId] = useState('');

  const goToAnimeDetails = (id: string, title: string) => {
    navigate(
      `/anime/details/${title
        .toLowerCase()
        .replace(/ |: |- |\. /g, '-')
        .replace(/-{2,} |\.{2,} |:{2,}/g, '-')}`,
      {
        state: { id },
      },
    );
  };

  useEffect(() => {
    if (location.state) {
      setAnimeId(location.state.id);
    }
  }, [location.state]);

  return {
    animeId,
    goToAnimeDetails,
  };
}
