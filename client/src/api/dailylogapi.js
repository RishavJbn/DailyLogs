// FIXED: Changed import path from "./axios" to "./config" (correct filename)
import axios from "./config.js";

// GET ALL LOGS
export const getAllLogs = async () => {
  const res = await axios.get("/");
  return res.data;
};

// GET BY DATE
export const getLogByDate = async (date) => {
  const res = await axios.get(`/by-date?date=${date}`);
  return res.data;
};

// CREATE
export const createLog = async (data) => {
  const res = await axios.post("/", data);
  return res.data;
};

// UPDATE
export const updateLog = async (id, data) => {
  const res = await axios.put(`/${id}`, data);
  return res.data;
};

// DELETE
export const deleteLog = async (id) => {
  const res = await axios.delete(`/${id}`);
  return res.data;
};
