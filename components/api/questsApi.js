import axios from './customizeAxios';

export const getQuestsApi = async (cityId) => {
    try {
        const response = await axios.get(`SideQuest/GetSideQuestByCityId/${cityId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching quests:", error);
        throw error;  // Ensure errors are properly handled in the UI
    }
}