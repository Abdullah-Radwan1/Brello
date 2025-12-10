import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 🔥 important for HTTP-only cookies
});

// Optional: Global error interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || "API Error";
    return Promise.reject(new Error(message));
  }
);

export default api;
