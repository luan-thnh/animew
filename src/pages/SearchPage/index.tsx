import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import Banner from 'components/Banner';
import CardList from 'components/CardList';

const SearchPage = () => {
  const location = useLocation();

  const { keyW, data } = location.state;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  return (
    <>
      <Banner title={`Search keyword: {${keyW}}`} />
      {data.length === 0 ? (
        <Alert variant="filled" severity="error" sx={{ mt: '16px' }}>
          No movies were found matching your keywords!
        </Alert>
      ) : (
        <CardList isLoading={isLoading} animeList={data} />
      )}
    </>
  );
};

SearchPage.propTypes = {};

export default SearchPage;
