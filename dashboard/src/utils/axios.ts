import axios from "axios";
import { getToken, setToken } from "./tokenStorage";
import { refreshTokenApi } from "../dataFetching/userApi/user.api";
// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// Request interceptor to add the authorization token
api.interceptors.request.use(
  async (config) => {
    const token = await getToken(import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if token is expired and if we haven't already retried this request
    if (
      error.response &&
      error.response?.data?.data?.hasOwnProperty("tokenExpired") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark request as retried
      console.log("refresh token called");
      try {
        const CustomApiResponse = await refreshTokenApi();
        const apiResponse = CustomApiResponse?.apiResponse;
        const storageStatus = CustomApiResponse?.storageStatus;

        if (apiResponse?.data?.tokenExpired) {
          // If the refresh token is also expired, redirect to login
          window.location.href = "/login";
          return Promise.reject("Session expired. Redirecting to login.");
        }

        if (apiResponse.success && storageStatus) {
          const newAccessToken = apiResponse.data.accessToken;
          const newRefreshToken = apiResponse.data.refreshToken;

          // Store new tokens in secure storage
          await setToken(
            import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN,
            newAccessToken
          );
          await setToken(
            import.meta.env.VITE_ACC_NAME_REFRESH_TOKEN,
            newRefreshToken
          );

          // Update the authorization header with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return api(originalRequest);
        } else {
          // Handle unexpected issues during token refresh
          console.error("Failed to refresh token:", apiResponse.message);
          window.location.href = "/login";
          return Promise.reject(apiResponse.message);
        }
      } catch (refreshError) {
        // Redirect to login if refresh token API fails
        console.error("Refresh token failed:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Propagate other errors
  }
);

export default api;
