import axios from './customizeAxios';

export const getUserProgressByUserId = async (id: string) => {
  try {
    const response = await axios.get(
      `/UserProgress/GetUserProgressByUserId/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};
