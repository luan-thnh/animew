import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCube } from 'swiper';
import { Box, Typography, Skeleton } from '@mui/material';
import { appBlack, appRed } from 'constants/colors';
import PaginationAnime from 'components/Pagination';
import animeApi from 'api/animeApi';
import CardList from 'components/CardList';
import Banner from 'components/Banner';

import 'swiper/css';
import 'swiper/css/effect-cube';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  document.title = 'Watch anime || AnimeW';

  const totalPages = useRef(1);
  const [animeList, setAnimeList] = useState([]);
  const [animePopular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({
    page: 1,
    limit: 15,
  });

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>, id: string, title: string) => {
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

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const dataAnimeList = await animeApi.getAnimeList(params);
        const dataPopular = await animeApi.getPopular();

        setAnimeList(dataAnimeList?.data.animes || []);
        setPopular(dataPopular?.data.animes || []);

        totalPages.current = dataAnimeList?.data.pagination.totalPages;
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnime();
  }, [params]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: page,
    }));
  };

  return (
    <>
      <Banner title="Recommended Anime" />
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height="50vh" animation="wave" />
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          speed={1500}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          effect={'cube'}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, EffectCube, Pagination]}
        >
          {animePopular.map(
            (item: { _id: string; title: string; imageUrl: string; episodeCount: number }) => (
              <SwiperSlide
                key={item.imageUrl}
                onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
                  handleClick(e, item._id, item.title)
                }
              >
                <Box position="relative" width="100%" height="100%">
                  <Box
                    width="100%"
                    height="100%"
                    position="relative"
                    sx={{
                      background: `url(${item.imageUrl})  center / cover no-repeat`,
                      filter: 'brightness(0.4) grayscale(0.6)',

                      '&:after': {
                        position: 'absolute',
                        left: 0,
                        content: '""',
                        width: '100%',
                        height: '100%',
                        background:
                          'radial-gradient(circle closest-corner at center 125px, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.9) 90%) no-repeat',
                      },
                    }}
                  ></Box>
                  <Box
                    position="absolute"
                    width="300px"
                    height="400px"
                    sx={{
                      top: '50%',
                      right: '100px',
                      transform: 'translateY(-50%)',
                      boxShadow: '6px 6px rgba(229, 57, 53, 0.6), 12px 12px rgba(229, 57, 53, 0.4)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <img src={item.imageUrl} alt="" />
                  </Box>
                  <Box
                    position="absolute"
                    width="500px"
                    sx={{ top: '50%', left: '100px', transform: 'translateY(-50%)' }}
                    textAlign="start"
                  >
                    <Typography
                      fontSize="48px"
                      fontFamily="Rubik Wet Paint, cursive"
                      color={appRed[800]}
                      noWrap
                    >
                      {item.title}
                    </Typography>
                    <Typography fontSize="24px" fontWeight="700" color={appBlack[0]} noWrap>
                      Episode {item.episodeCount}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      )}
      <Banner title="Recently Updated" />
      <CardList isLoading={isLoading} animeList={animeList} />
      <PaginationAnime totalPages={totalPages.current} handlePageChange={handlePageChange} />
    </>
  );
};

export default HomePage;
