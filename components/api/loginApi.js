import axios from './customizeAxios';

export const loginApi = (email, password) => {
    return axios.post("Auth/login", { email, password });
    // return axios.post("/api/login", { email, password });
};

export const registerApi = (email, name, password, confirmPassword) => {
    return axios.post("Auth/register", { email, name, password, confirmPassword });
    // return axios.post("/api/login", { email, password });
};

export default {
    loginApi,
};