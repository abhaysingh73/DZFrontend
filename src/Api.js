import axios from "axios";

    const API = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true
    });

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const excludedPaths = ['/login', '/refresh'];
        const isExcluded = excludedPaths.some(path => originalRequest.url.includes(path));
        if ((error.response?.status === 401 || error.response?.status === 403) && !isExcluded) {
            try {
                const newToken = await refreshToken();
                if (newToken) {
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    return API(error.config); // Retry failed request with new token
                }
            } catch (refreshError) {
                console.error("Session expired. Please log in again.");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
const refreshToken = async () => {
    try {
        // const refreshToken = localStorage.getItem("refreshToken");
        const response = await API.post("/api/onboard/refresh");
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        console.error("Unable to refresh token", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.error("Session expired. Please log in again.");
        // window.location.href = "/login"; // Redirect to login page
    }
};

export default API;
