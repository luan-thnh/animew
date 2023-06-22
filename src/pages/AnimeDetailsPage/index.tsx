import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import animeApi from 'api/animeApi';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import { appBlack, appOrange, appRed } from 'constants/colors';
import CommentList from 'components/CommentList';

interface IAnime {
  title: string;
  type: string;
  imageUrl: string;
  description: string;
  releaseDate: string;
  episodeCount: number;
  rating: number;
  genres: string[];
}

const AnimeDetailsPage = () => {
  const location = useLocation();
  const id = location.state.id;

  const navigate = useNavigate();

  const handleClick = (epValue = 1) => {
    navigate(
      `/watch-anime/${title
        .toLocaleLowerCase()
        .replace(/ |: |- |\. /g, '-')
        .replace(/-{2,} |\.{2,} |:{2,}/g, '-')}/episode/${epValue}`,
      {
        state: { id },
      },
    );
  };

  const [isLoading, setIsLoading] = useState(true);
  const [animeDetails, setAnimeDetails] = useState<IAnime>({
    title: '',
    type: '',
    imageUrl: '',
    description: '',
    releaseDate: '',
    episodeCount: 0,
    rating: 0,
    genres: [],
  });

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const data = await animeApi.getAnimeDetail(id);

        setAnimeDetails(data?.data.anime || {});
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnime();
  }, [id]);

  const { title, imageUrl, description, type, episodeCount, genres, rating, releaseDate } =
    animeDetails;

  document.title = `${title} || AnimeW`;

  return (
    <Stack>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={32}
          animation="wave"
          style={{ margin: '8px 0' }}
        />
      ) : (
        <Typography
          variant="h5"
          fontWeight="700"
          textAlign="center"
          my="8px"
          sx={{
            textShadow: `1px 2px ${appRed[900]}`,
          }}
        >
          {title}
        </Typography>
      )}
      <Stack
        bgcolor={appBlack[800]}
        alignItems="start"
        justifyContent="space-between"
        direction="row"
        gap="48px"
        p="16px"
        boxShadow={`0 2px ${appRed[600]}`}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" width={225} height={318} animation="wave" />
        ) : (
          <Stack width="260px" border={`8px solid ${appRed[900]}`} overflow="hidden">
            <img src={imageUrl} alt={title} />
          </Stack>
        )}

        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="318px" animation="wave" />
        ) : (
          <Stack sx={{ flexGrow: 1 }}>
            <Stack direction="row" pt="8px">
              <Typography fontWeight="700" letterSpacing="0" color={appBlack[100]} width="150px">
                Genres
              </Typography>
              <Stack
                gap="8px"
                direction="row"
                justifyContent="center"
                flexGrow="1"
                borderBottom={`thin solid ${appBlack[600]}`}
                pb="16px"
              >
                {genres.map((genre) => (
                  <Link key={genre} to={`/anime/genre/${genre.toLocaleLowerCase()}`}>
                    <Typography
                      component="span"
                      variant="body2"
                      bgcolor="rgba(255, 255, 255, 0.15)"
                      p="4px 8px"
                      borderRadius="5px"
                      fontWeight="600"
                      color={appBlack[100]}
                    >
                      {genre}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Stack>
            <Stack direction="row" pt="12px">
              <Typography fontWeight="700" letterSpacing="0" color={appBlack[100]} width="150px">
                Rating
              </Typography>
              <Typography
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                }}
                component="span"
                variant="body2"
                fontWeight="600"
                color={appBlack[100]}
                textAlign="center"
                borderBottom={`thin solid ${appBlack[600]}`}
                pb="12px"
              >
                <span>{rating} / 10</span>{' '}
                <StarIcon sx={{ width: '18px', color: appOrange[500] }} />
              </Typography>
            </Stack>

            <Stack direction="row" pt="12px">
              <Typography fontWeight="700" letterSpacing="0" color={appBlack[100]} width="150px">
                Release date
              </Typography>
              <Typography
                sx={{ flexGrow: 1 }}
                component="span"
                variant="body2"
                fontWeight="600"
                color={appBlack[100]}
                textAlign="center"
                borderBottom={`thin solid ${appBlack[600]}`}
                pb="12px"
              >
                {releaseDate.replaceAll('-', ' - ')}
              </Typography>
            </Stack>
            <Stack direction="row" pt="12px">
              <Typography fontWeight="700" letterSpacing="0" color={appBlack[100]} width="150px">
                Latest episode
              </Typography>
              <Typography
                sx={{ flexGrow: 1 }}
                component="span"
                variant="body2"
                fontWeight="600"
                color={appBlack[100]}
                borderBottom={`thin solid ${appBlack[600]}`}
                textAlign="center"
                pb="12px"
              >
                Episode {episodeCount}
              </Typography>
            </Stack>
            <Stack direction="row" pt="12px">
              <Typography fontWeight="700" letterSpacing="0" color={appBlack[100]} width="150px">
                Type anime
              </Typography>
              <Typography
                sx={{ flexGrow: 1 }}
                component="span"
                variant="body2"
                fontWeight="600"
                color={appRed[600]}
                textAlign="center"
                pb="12px"
              >
                {type}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>

      <Stack
        mt="16px"
        p="12px"
        borderRadius="10px"
        bgcolor={appBlack[800]}
        direction="row"
        gap="16px"
      >
        <Button
          variant="contained"
          onClick={() => handleClick()}
          sx={{ minWidth: 0, width: '65px', height: '45px', boxShadow: `0 2px ${appBlack[900]}` }}
        >
          <PlayCircleOutlineIcon style={{ fontSize: '32px' }} />
        </Button>
        <Button
          variant="contained"
          color="blue"
          sx={{ minWidth: 0, width: '65px', height: '45px', boxShadow: `0 2px ${appBlack[900]}` }}
        >
          <BookmarkAddIcon style={{ fontSize: '32px' }} />
        </Button>
      </Stack>

      <Stack direction="row" gap="16px">
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            height={172}
            animation="wave"
            sx={{ flex: 1, mt: '16px', borderRadius: '10px' }}
          />
        ) : (
          <Stack mt="16px" p="12px" borderRadius="10px" bgcolor={appBlack[800]} gap="16px" flex="1">
            <Typography
              fontWeight="700"
              color={appBlack[100]}
              pb="6px"
              borderBottom={`1px dashed ${appRed[600]}`}
              display="block"
            >
              Episode list
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap="4px" maxHeight="250px" overflow="auto">
              {Array.from(new Array(episodeCount), (item, index) => (
                <Button
                  key={index}
                  onClick={() => handleClick(episodeCount - index)}
                  variant="contained"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '72px',
                    maxWidth: '74px',
                    height: '44px',
                    bgcolor: appBlack[900],
                  }}
                >
                  {episodeCount - index}
                </Button>
              ))}
            </Stack>
          </Stack>
        )}
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            height={172}
            animation="wave"
            sx={{ flex: 2, mt: '16px', borderRadius: '10px' }}
          />
        ) : (
          <Stack mt="16px" p="12px" borderRadius="10px" bgcolor={appBlack[800]} gap="16px" flex="2">
            <Typography
              fontWeight="700"
              color={appBlack[100]}
              pb="6px"
              borderBottom={`1px dashed ${appRed[600]}`}
              display="block"
            >
              Description
            </Typography>
            <Typography
              color={appBlack[100]}
              pb="6px"
              display="block"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 5,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </Typography>
          </Stack>
        )}
      </Stack>

      <CommentList animeId={id} />
    </Stack>
  );
};

AnimeDetailsPage.propTypes = {};

export default AnimeDetailsPage;
