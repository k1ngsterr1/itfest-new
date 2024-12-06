import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'https://itfest-backend-production.up.railway.app/api',
    withCredentials: true,
});

