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

export const GetCluesForCity = async (id: string) => {
  try {
    const response = await axios.get(`/Clue/GetCluesForCity/${id}/1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};

export const PostClue = async (
  clueId: number,
  answer: string,
  userId: string
) => {
  try {
    const response = await axios.post('/Clue', {
      clueId,
      answer,
      userId,
    });
    if (response.status === 200 || response.status === 500) {
      return response.data;
    } else {
      throw new Error(`Unexpected response: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Network error: Unable to reach the server');
    } else {
      console.error('Unexpected Error:', error.message);
      throw new Error('Unexpected error occurred');
    }
  }
};
