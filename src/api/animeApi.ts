import axiosClient from './axiosClient';

const animeApi = {
  getAnimeList: async (params: { page: number; limit: number }) => {
    return axiosClient.get(`/anime/anime-list`, { params });
  },
  getPopular: async () => {
    return axiosClient.get(`/anime/popular`);
  },
  getTopAnime: async () => {
    return axiosClient.get(`/anime/top-anime`);
  },
  getSearch: async (params: {
    title?: string;
    type?: string;
    genre?: string;
    year?: number;
    gte?: boolean;
    episodeCount?: number;
    rating?: number;
  }) => {
    return axiosClient.get(`/anime/search`, { params });
  },
  getAnimeDetail: async (animeId: string | undefined) => {
    return axiosClient.get(`/anime/details/${animeId}`);
  },
  getAnimeDetailByEpisodes: async (animeId: string, params: { ep?: string }) => {
    return axiosClient.get(`/anime/details/${animeId}/episodes`, { params });
  },
  getAnimeHistory: async () => {
    return axiosClient.get(`/anime/history`);
  },
  deleteAnimeHistory: async (animeHistoryId: string) => {
    return axiosClient.delete(`/anime/history/${animeHistoryId}`);
  },
  getAnimeWatchList: async () => {
    return axiosClient.get(`/anime/watch-list`);
  },
  postAnimeWatchList: async (animeId: string) => {
    return axiosClient.post(`/anime/watch-list/${animeId}`);
  },
  deleteAnimeWatchList: async (animeWatchListId: string) => {
    return axiosClient.delete(`/anime/watch-list/${animeWatchListId}`);
  },
};

export default animeApi;
