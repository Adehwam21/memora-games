import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { store } from "../redux/store"; // Import the Redux store

const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

// Request interceptor to add auth token dynamically
API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from Redux store
        const token = store.getState().auth.token || localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No token found in Redux or localStorage"); // Debugging
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

export default API;
