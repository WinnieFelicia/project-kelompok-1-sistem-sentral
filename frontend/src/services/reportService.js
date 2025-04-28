import axios from 'axios';

const API_URL = '/api/report';

export const getReport = async (startDate, endDate) => {
  const response = await axios.get(API_URL, {
    params: { startDate, endDate }
  });
  return response.data;
};
