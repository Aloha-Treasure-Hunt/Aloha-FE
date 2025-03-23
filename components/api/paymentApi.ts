import axios from './customizeAxios';

export const postPaymentApi = async (userId: string , packageId: number , method: number ) => {
    try {
        const formData = new FormData();
        formData.append("UserId", userId); // Đảm bảo tên "File" đúng với API backend
        formData.append("PackageId", String(packageId));
        formData.append("Method", String(method));

        const response = await axios.post(`Payment/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting quests:", error);
        throw error;
    }
};