import { toast } from 'react-toastify';
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

export const submitQuestsApi = async (userId , sideQuestId , file ) => {
    try {
        const formData = new FormData();
        formData.append("File", file); // Đảm bảo tên "File" đúng với API backend

        const response = await axios.post(`SideQuest/CheckSideQuest?UserId=${userId}&SideQuestId=${sideQuestId}  `, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if(response.status === 400) toast.error(response.data.message);

        return response.data;
    } catch (error) {
        console.error("Error submitting quests:", error);
        toast.error("Side Quest already completed");
        throw error;
    }
};

