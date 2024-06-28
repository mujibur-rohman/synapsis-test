import axios from "axios";

const API_VERSION = "/public/v1";

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL + API_VERSION,
});

axiosConfig.interceptors.request.use(
  async function (config) {
    config.headers.Authorization = "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
