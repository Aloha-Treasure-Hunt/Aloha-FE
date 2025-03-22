import axios from './customizeAxios';

export const getClueApi = async () => {
  try {
    const response = await axios.get('/Clue');
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};
