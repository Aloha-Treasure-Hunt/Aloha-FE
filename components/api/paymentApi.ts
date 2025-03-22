import { toast } from 'react-toastify';
import axios from './customizeAxios';

export const postPaymentApi = async (userId: string , packageId: number , method: number ) => {
    try {
        const formData = new FormData();
        formData.append("UserId", userId); // Đảm bảo tên "File" đúng với API backend
        formData.append("PackageId", String(packageId));
        formData.append("Method", String(method));

        const response = await axios.post(`SideQuest/CheckSideQuest?UserId=${userId}&SideQuestId=${packageId}  `, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if(response.status === 400) toast.error(response.data.message);
        else toast.success("Submit successfully!");

        return response.data;
    } catch (error) {
        console.error("Error submitting quests:", error);
        throw error;
    }
};