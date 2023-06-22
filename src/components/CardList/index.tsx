import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Stack } from '@mui/material';
import CardItem from './CardItem';
import { appBlack } from 'constants/colors';

interface IEpisode {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  episodeCount: number;
  rating: number;
  type: string;
  releaseDate: string;
  genres: string[];
}

const CardList = (props: { isLoading: boolean; animeList: IEpisode[] }) => {
  const { isLoading, animeList } = props;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap="16px"
      justifyContent="start"
      bgcolor={appBlack[800]}
      p={3}
      borderRadius={3}
    >
      {(isLoading ? Array.from(new Array(15)) : animeList).map((item, index) => (
        <Box key={index} sx={{ width: '18.9%' }} borderRadius="8px">
          {item ? (
            <CardItem
              id={item._id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              episodeCount={item.episodeCount}
              rating={item.rating}
              type={item.type}
              releaseDate={item.releaseDate}
              genres={item.genres}
            />
          ) : (
            <>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="300px"
                sx={{ borderRadius: '8px' }}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="80%"
                height="30px"
                sx={{ borderRadius: '8px', mt: 1 }}
              />
            </>
          )}
        </Box>
      ))}
    </Stack>
  );
};

CardList.propTypes = {
  isLoading: PropTypes.bool,
  animeList: PropTypes.array.isRequired,
};

export default CardList;
