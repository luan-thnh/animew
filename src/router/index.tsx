import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { screenUrl } from 'constants/screenUrl';
import HomePage from 'pages/HomePage';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import ErrorPage from 'pages/ErrorPage';
import LoginPage from 'pages/LoginPage';
import AnimeDetailsPage from 'pages/AnimeDetailsPage';
import WatchAnimePage from 'pages/WatchAnimePage';
import { AppContext } from 'components/Contexts';
import authAPI from 'api/authApi';
import RegisterPage from 'pages/RegisterPage';
import ProfilePage from 'pages/ProfilePage';
import SearchPage from 'pages/SearchPage';
import HistoryPage from 'pages/HistoryPage';

const AppRouter = (): JSX.Element => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const res = await authAPI.getCurrentUser();

        console.log({ res });

        if (res.data.user) {
          const {
            username,
            profile: { avatar },
          } = res.data.user;

          dispatch({ type: 'CURRENT_USER', payload: { username, avatar } });
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkCurrentUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path={screenUrl.HOME} element={<HomePage />} />
          <Route path={screenUrl.LOGIN} element={<LoginPage />} />
          <Route path={screenUrl.REGISTER} element={<RegisterPage />} />
          <Route path={screenUrl.ANIME_DETAILS} element={<AnimeDetailsPage />} />
          <Route path={screenUrl.WATCH_ANIME} element={<WatchAnimePage />} />
          <Route path={screenUrl.PROFILE} element={<ProfilePage />} />
          <Route path={screenUrl.SEARCH} element={<SearchPage />} />
          <Route path={screenUrl.HISTORY} element={<HistoryPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
