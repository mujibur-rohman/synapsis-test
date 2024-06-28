import axios from "axios";

const API_VERSION = "/public/v2";
const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL + API_VERSION,
});

export default axiosConfig;
