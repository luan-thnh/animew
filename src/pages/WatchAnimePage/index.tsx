import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import animeApi from 'api/animeApi';
import { Stack, Typography, Button, Box, Tooltip, Skeleton } from '@mui/material';
import { appBlack, appBlue, appOrange, appRed } from 'constants/colors';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import InfoIcon from '@mui/icons-material/Info';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import CommentList from 'components/CommentList';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';

interface IAnimeVideo {
  animeId?: string;
  title?: string;
  episodeCount?: number;
  episodes?: [
    {
      title: string;
      videoUrl: string;
      episodeNumber: number;
    },
  ];
}

const WatchAnimePage = () => {
  const location = useLocation();
  const id = location.state.id;

  const { epValue } = useParams();
  const navigate = useNavigate();

  const handleDetailsClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    id: string,
    title: string,
  ) => {
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

  const [animeVideo, setAnimeVideo] = useState<IAnimeVideo | null>(null);

  useEffect(() => {
    const loadingAnime = async () => {
      try {
        const res = await animeApi.getAnimeDetailByEpisodes(id, { ep: epValue });

        setAnimeVideo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadingAnime();
  }, [epValue, id]);

  const handleWatchVideoClick = (epValue: number) => {
    if (animeVideo?.title) {
      navigate(
        `/watch-anime/${animeVideo?.title
          .toLocaleLowerCase()
          .replace(/ |: |- |\. /g, '-')
          .replace(/-{2,} |\.{2,} |:{2,}/g, '-')}/episode/${epValue}`,
        {
          state: { id },
        },
      );
    }
  };

  document.title = `${animeVideo?.episodes?.[0]?.title} || AnimeW`;

  return (
    <Stack>
      <Stack bgcolor={appBlack[800]} p="14px" borderRadius="12px">
        <Typography
          component={Stack}
          gap="8px"
          alignItems="center"
          direction="row"
          fontWeight="600"
          color={appOrange[600]}
          pb="10px"
          borderBottom={`1px dashed ${appBlack[600]}`}
        >
          <MovieCreationIcon />
          {animeVideo?.title}
        </Typography>

        <Typography variant="body2" fontWeight="600" color={appBlack[100]} pt="10px">
          Watching Episode {animeVideo?.episodes?.[0]?.episodeNumber}
        </Typography>
      </Stack>

      <Stack
        bgcolor="rgba(229, 57, 53, 0.3)"
        mt="16px"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        minHeight="50px"
        overflow="hidden"
      >
        <Box
          minHeight="58px"
          sx={{
            position: 'relative',
          }}
        >
          <Typography
            height="100%"
            p="14px"
            bgcolor={appBlack[800]}
            fontWeight="600"
            color={appBlack[100]}
            sx={{
              pt: '20px',
              '&::after': {
                border: '30px solid transparent',
                borderLeftColor: appBlack[800],
                borderBottomColor: appBlack[800],
                content: "''",
                position: 'absolute',
                left: ' 100%',
                top: '0',
              },
            }}
          >
            Episode {animeVideo?.episodes?.[0]?.episodeNumber}
          </Typography>
        </Box>
        <Box
          p="14px"
          minHeight="58px"
          bgcolor={appBlack[800]}
          component={Stack}
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'relative',
          }}
        >
          <Box
            component={Stack}
            direction="row"
            gap="12px"
            alignItems="center"
            sx={{
              '&::after': {
                border: '30px solid transparent',
                borderRightColor: appBlack[800],
                borderBottomColor: appBlack[800],
                content: "''",
                position: 'absolute',
                right: '100%',
                top: '0',
              },
            }}
          >
            <Tooltip title="Information">
              <Button
                sx={{
                  minWidth: 0,
                  width: '30px',
                  height: '30px',
                  bgcolor: appBlue[500],
                  '&:hover': { bgcolor: appBlue[800] },
                }}
                variant="contained"
                onClick={(e) =>
                  handleDetailsClick(e, animeVideo?.animeId || '', animeVideo?.title || '')
                }
              >
                <InfoIcon sx={{ width: '22px' }} />
              </Button>
            </Tooltip>
            <Tooltip title="Report">
              <Button
                sx={{
                  minWidth: 0,
                  width: '30px',
                  height: '30px',
                  bgcolor: appRed[500],
                  '&:hover': { bgcolor: appRed[800] },
                }}
                variant="contained"
              >
                <ReportProblemRoundedIcon sx={{ width: '22px' }} />
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Stack>

      {animeVideo?.episodes?.[0].videoUrl ? (
        <Stack mt="24px" sx={{ cursor: 'pointer' }}>
          <iframe
            src={animeVideo?.episodes?.[0].videoUrl}
            frameBorder="0"
            title={animeVideo?.title}
            height="715px"
            style={{ overflow: 'hidden' }}
          ></iframe>
        </Stack>
      ) : (
        <Skeleton
          sx={{ mt: '24px', mb: '12px' }}
          variant="rectangular"
          width="100%"
          height="715px"
          animation="wave"
        />
      )}

      <Stack
        direction="row"
        gap="16px"
        justifyContent="space-between"
        mt="4px"
        bgcolor="rgba(229, 57, 53, 0.3)"
        overflow="hidden"
      >
        <Box
          minHeight="58px"
          p="16px 0"
          width="50px"
          bgcolor={appBlack[800]}
          sx={{
            position: 'relative',
            pt: '20px',
            '&::after': {
              border: '35px solid transparent',
              borderLeftColor: appBlack[800],
              borderBottomColor: appBlack[800],
              content: "''",
              position: 'absolute',
              left: ' 100%',
              top: '0',
            },
          }}
        ></Box>
        <Stack direction="row" gap="16px" my="12px">
          <Button
            variant="text"
            color="white"
            disabled
            sx={{
              textTransform: 'capitalize',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '5px',
              cursor: 'pointer',
              '&:disabled': {
                color: appBlack[400],
              },
            }}
          >
            <SkipPreviousRoundedIcon /> Prev
          </Button>
          <Button
            variant="contained"
            // color="white"
            sx={{
              textTransform: 'capitalize',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '5px',
            }}
          >
            Next <SkipNextRoundedIcon />
          </Button>
        </Stack>
        <Box
          minHeight="58px"
          p="16px 0"
          width="50px"
          bgcolor={appBlack[800]}
          sx={{
            position: 'relative',
            pt: '20px',
            '&::after': {
              border: '35px solid transparent',
              borderRightColor: appBlack[800],
              borderBottomColor: appBlack[800],
              content: "''",
              position: 'absolute',
              right: '100%',
              top: '0',
            },
          }}
        ></Box>
      </Stack>

      <Stack mt="16px" bgcolor={appBlack[800]} p="12px" borderRadius="8px">
        <Typography
          pb="8px"
          borderBottom={`1px dashed ${appBlack[700]}`}
          fontWeight="600"
          color={appBlack[100]}
        >
          Episode List
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap="4px" maxHeight="250px" overflow="auto" pt="8px">
          {Array.from(new Array(animeVideo?.episodeCount), (item, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => handleWatchVideoClick(index + 1)}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '72px',
                maxWidth: '74px',
                height: '44px',
                bgcolor:
                  index + 1 === animeVideo?.episodes?.[0]?.episodeNumber
                    ? appRed[800]
                    : appBlack[900],
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Stack>
      </Stack>

      <CommentList animeId={id} />
    </Stack>
  );
};

export default WatchAnimePage;
