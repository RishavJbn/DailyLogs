import axios from "axios";

export const axiosLogs = axios.create({
  baseURL: "http://localhost:8000/api/v1/dailylog",
  withCredentials: true,
});

export const axiosUsers = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
  withCredentials: true,
});
