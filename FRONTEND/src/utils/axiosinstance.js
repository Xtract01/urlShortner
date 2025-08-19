import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
      return Promise.reject({
        message: error.response.data?.message || "API Error",
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("No response from server.");
      return Promise.reject({
        message: "No response from server.",
      });
    } else {
      console.error("Axios Error:", error.message);
      return Promise.reject({
        message: error.message,
      });
    }
  }
);

export default axiosInstance;
