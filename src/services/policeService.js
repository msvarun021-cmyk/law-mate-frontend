import { api } from './api';

export const getPoliceDashboard = async () => {
  const response = await api.get('/police/dashboard');
  return response.data;
};

export const draftFIR = async (complaintText) => {
  const response = await api.post('/police/draft-fir', { text: complaintText });
  return response.data;
};