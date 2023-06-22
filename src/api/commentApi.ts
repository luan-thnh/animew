import axiosClient from './axiosClient';

const commentApi = {
  getComments: async (animeId: string) => {
    return axiosClient.get(`/comments/anime/${animeId}`);
  },
  createComment: async (data: { animeId: string; content: string }) => {
    return axiosClient.post('/comments', data);
  },
  updateComment: async (commentId: string) => {
    return axiosClient.put(`/comments/${commentId}`);
  },
  deleteComment: async (commentId: string) => {
    return axiosClient.put(`/comments/${commentId}`);
  },
};

export default commentApi;
