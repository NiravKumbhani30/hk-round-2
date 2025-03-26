import axios from "axios";
import jsCookie from "js-cookie";

// Create Axios instance
const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = jsCookie.get(process.env.COOKIE_NAME || "auth_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor - Handles Errors
api.interceptors.response.use(
    (response) => response.data, // Return only data
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Export HTTP Methods
const apiRequest = {
    get: (url, params = {}, options = {}) => api.get(url, { params, ...options }),
    post: (url, data, options = {}) => api.post(url, data, options),
    put: (url, data, options = {}) => api.put(url, data, options),
    delete: (url, options = {}) => api.delete(url, options),
};

export default apiRequest;
