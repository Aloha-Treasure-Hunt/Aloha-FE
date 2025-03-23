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

export const submitQuestsApi = async (userId, sideQuestId, file, router) => {
    try {
        const formData = new FormData();
        formData.append("File", file);

        const response = await axios.post(
            `SideQuest/CheckSideQuest?UserId=${userId}&SideQuestId=${sideQuestId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        // Xử lý trường hợp API trả về message yêu cầu chuyển hướng tới /fail-status
        if (response.data.message === "The evidence provided does not match the side quest's requirement.") {
            const errorData = encodeURIComponent(JSON.stringify(response.data));
            router.push(`/fail-status?errorData=${errorData}`);
            return;
        }

        // Nếu thành công, chuyển hướng tới /success-status
        router.push(
            `/success-status?points=${response.data.data.pointsEarned}&progress=${response.data.data.currentProgress}`
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting quests:", error);

        if (error.response && error.response.status === 409) {
            // Xử lý trường hợp đã hoàn thành side quest (status code 409)
            const errorData = encodeURIComponent(JSON.stringify(error.response.data));
            router.push(`/fail-status?errorData=${errorData}`);
            return;
        }

        // Trường hợp lỗi khác
        toast.error("Something went wrong.");
        throw error;
    }
};


