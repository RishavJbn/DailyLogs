import { axiosUsers } from "./config.js";

/* =========================
   AUTH APIs
========================= */

// LOGIN
export const loginUser = async (data) => {
  const res = await axiosUsers.post("/login", data);
  return res.data;
};

// SIGNUP
export const registerUser = async (data) => {
  const res = await axiosUsers.post("/signup", data);
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await axiosUsers.post("/logout");
  return res.data;
};

// GET CURRENT USER
export const getCurrentUser = async () => {
  const res = await axiosUsers.post("/me");
  return res.data;
};

// CHANGE PASSWORD
export const changePassword = async (data) => {
  const res = await axiosUsers.get("/change-password", data);
  return res.data;
};

// REFRESH TOKEN
export const refreshToken = async () => {
  const res = await axiosUsers.post("/refresh-token");
  return res.data;
};

// REQUEST PASSWORD RESET
export const requestPasswordReset = async (data) => {
  const res = await axiosUsers.post("/forgot-password", data);
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (data) => {
  const res = await axiosUsers.post("/reset-password", data);
  return res.data;
};
