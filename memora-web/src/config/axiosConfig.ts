import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, // Ensure this is correct
});

API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No token found in localStorage"); // Debugging step
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

export default API;
