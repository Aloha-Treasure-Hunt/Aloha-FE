import instance from './customizeAxios';
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
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await instance.post('/Clue', {
      clueId,
      answer,
      userId,
    });

    return response.data;
  } catch (error) {
    // console.error('API Error:', error);
    throw error; // Throw lỗi để xử lý tiếp ở `useVerification`
  }
};
