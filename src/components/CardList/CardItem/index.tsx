import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Popover,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import StarIcon from '@mui/icons-material/Star';
import { appBlack, appRed } from 'constants/colors';
import { appOrange } from 'constants/colors';
import { Link, useNavigate } from 'react-router-dom';

const CardItem = (props: {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  episodeCount: number;
  rating: number;
  type: string;
  releaseDate: string;
  genres: string[];
}) => {
  const { id, title, description, imageUrl, episodeCount, rating, type, releaseDate, genres } =
    props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClickAnimeDetail = () => {
    navigate(
      `/anime/details/${title
        .toLocaleLowerCase()
        .replace(/ |: |- |\. /g, '-')
        .replace(/-{2,} |\.{2,} |:{2,}/g, '-')}`,
      {
        state: { id },
      },
    );
  };

  const handleClickWatchVideo = (epValue = 1) => {
    navigate(
      `/watch-anime/${title
        .toLocaleLowerCase()
        .replace(/ |: |- |\. /g, '-')
        .replace(/-{2,} |\.{2,} |:{2,}/g, '-')}/episode/${epValue}`,
      {
        state: { id, episodeCount },
      },
    );
  };

  return (
    <>
      <Card
        sx={{ maxWidth: '100%', bgcolor: appBlack[900], position: 'relative', cursor: 'pointer' }}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
      >
        <CardActionArea>
          <CardMedia component="img" height="280" image={imageUrl} alt="green iguana" />
        </CardActionArea>
        <CardContent sx={{ p: '12px 8px' }}>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            noWrap
            color={appOrange[800]}
            fontWeight="600"
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="span"
            noWrap
            overflow="visible"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'inline-block',
              pointerEvents: 'none',
              '&:after': {
                content: '""',
                position: 'absolute',
                top: '-70px',
                left: '-70px',
                zIndex: 2,
                borderLeft: '70px solid transparent',
                borderRight: '70px solid rgba(229, 57, 53, 0.8)',
                borderBottom: '70px solid transparent',
                borderTop: '70px solid transparent',
                transform: 'rotate(45deg)',
              },
              '&:before': {
                content: '""',
                position: 'absolute',
                top: '-100px',
                left: '-50px',
                zIndex: 1,
                width: '155px',
                height: '155px',
                border: '3px solid rgba(229, 57, 53, 1)',
                transform: 'rotate(45deg)',
              },
            }}
          >
            <span
              style={{
                position: 'relative',
                top: '16px',
                left: '12px',
                zIndex: 3,
                fontWeight: 700,
              }}
            >
              {type === 'OVA' ? `${episodeCount}/1` : `${episodeCount}/??`}
            </span>
          </Typography>
        </CardContent>
      </Card>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        transitionDuration={300}
        disableRestoreFocus
        disableScrollLock={true}
        sx={{
          '.MuiPaper-root': {
            boxShadow: '0 1px 10px rgba(0, 0, 0, 0.8)',
            borderRadius: '10px',
            bgcolor: appBlack[900],
          },
        }}
      >
        <CardActionArea component="div" onMouseLeave={handlePopoverClose}>
          <Stack bgcolor={appBlack[900]} width="284px" height="390px" whiteSpace="normal">
            <Box position="relative">
              <img
                src={imageUrl}
                alt={title}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  objectPosition: '0 -80px',
                }}
              />

              <Stack
                position="absolute"
                sx={{ bottom: '16px', right: '16px' }}
                direction="row"
                gap="8px"
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleClickWatchVideo(episodeCount)}
                  sx={{
                    width: '30px',
                    height: '30px',
                    minWidth: 0,
                    p: 0,
                    color: appBlack[0],
                    bgcolor: appRed[600],
                    borderRadius: 999,
                  }}
                >
                  <PlayArrowIcon />
                </Button>
                <Button
                  color="white"
                  variant="contained"
                  sx={{
                    width: '30px',
                    height: '30px',
                    minWidth: 0,
                    p: 0,
                    fontSize: '5px',
                    borderRadius: 999,
                    color: appBlack[900],
                  }}
                >
                  <BookmarkAddOutlinedIcon />
                </Button>
              </Stack>
            </Box>
            <Stack p="8px" color={appBlack[0]} onClick={handleClickAnimeDetail}>
              <Typography noWrap sx={{ transition: '0.2s', '&:hover': { color: appRed[600] } }}>
                {title}
              </Typography>
              <Stack direction="row" alignItems="center" gap="4px" color={appRed[600]}>
                <StarIcon sx={{ width: '16px' }} />
                <Typography variant="body2" fontWeight="700" lineHeight="1.6">
                  {rating}
                </Typography>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ border: `1px solid ${appBlack[100]}`, height: '12px' }}
                />
                <Typography variant="body2" lineHeight="1.6" color={appBlack[100]}>
                  {releaseDate}
                </Typography>
              </Stack>
              <Stack direction="row" flexWrap="wrap" gap="4px" py="4px">
                {genres.map((genre) => (
                  <Typography
                    key={genre}
                    variant="caption"
                    lineHeight="1.6"
                    color={appBlack[100]}
                    bgcolor={appBlack[700]}
                    px="4px"
                    borderRadius="5px"
                  >
                    {genre}
                  </Typography>
                ))}
              </Stack>
              <Typography
                pt="4px"
                variant="body2"
                color={appBlack[0]}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {description}
              </Typography>
            </Stack>
          </Stack>
        </CardActionArea>
      </Popover>
    </>
  );
};

CardItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  episodeCount: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
};

export default CardItem;
