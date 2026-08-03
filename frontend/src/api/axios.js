import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem("access");
if (token) {
   config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      localStorage.getItem("refresh")
    ) {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/login/refresh/",
          {
            refresh: localStorage.getItem("refresh"),
          }
        );

        localStorage.setItem("access", res.data.access);

        error.config.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(error.config);
      } catch {
        localStorage.clear();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export const isLoggedIn = () => !!localStorage.getItem("access");

export const logout = () => {
 localStorage.removeItem("access");
 localStorage.removeItem("refresh");
};
