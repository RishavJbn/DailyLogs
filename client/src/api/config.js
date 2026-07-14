import axios from "axios";

const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, "");

export const axiosLogs = axios.create({
  baseURL: `${apiBaseUrl}/dailylog`,
  withCredentials: true,
});

export const axiosUsers = axios.create({
  baseURL: `${apiBaseUrl}/user`,
  withCredentials: true,
});
