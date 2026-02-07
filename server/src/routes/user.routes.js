import { Router } from "express";
import {
  changePassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAcessToken,
  registerUser,
  forgotPassword,
  resetPasswordWithToken,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.post("/refresh-token", refreshAcessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPasswordWithToken);

//protected routes via middleware
router.post("/logout", verifyJWT, logoutUser);
router.post("/me", verifyJWT, getCurrentUser);
router.get("/change-password", verifyJWT, changePassword);

export { router as userRoutes };
