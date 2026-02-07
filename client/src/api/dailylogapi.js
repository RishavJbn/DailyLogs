// FIXED: Changed import path from "./axios" to "./config" (correct filename)
import { axiosLogs } from "./config.js";

// GET ALL LOGS
export const getAllLogs = async () => {
  const res = await axiosLogs.get("/");
  return res.data;
};

// GET BY DATE
export const getLogByDate = async (date) => {
  const res = await axiosLogs.get(`/by-date?date=${date}`);
  return res.data;
};

// CREATE
export const createLog = async (data) => {
  const res = await axiosLogs.post("/", data);
  return res.data;
};

// UPDATE
export const updateLog = async (id, data) => {
  const res = await axiosLogs.put(`/${id}`, data);
  return res.data;
};

// DELETE
export const deleteLog = async (id) => {
  const res = await axiosLogs.delete(`/${id}`);
  return res.data;
};
