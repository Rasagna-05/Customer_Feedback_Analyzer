import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
});

export const createFeedback = (data) => api.post('/feedback', data);

export const getAllFeedback = () => api.get('/feedback');

export const getFeedbackByProduct = (productId) =>
  api.get(`/feedback/${productId}`);

export const getSentimentSummary = (productId) =>
  api.get(`/feedback/${productId}/sentiment-summary`);

export const getThemeSummary = (productId) =>
  api.get(`/feedback/${productId}/theme-summary`);

export default api;
