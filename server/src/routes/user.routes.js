import { Router } from "express";
import { changePassword, getCurrentUser, loginUser, logoutUser, refreshAcessToken, registerUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/login",loginUser);
router.post("/signup",registerUser);
router.post("/refresh-token",refreshAcessToken);

//protected routes via middleware
router.post("/logout",logoutUser);
router.post("/me",verifyJWT,getCurrentUser);
router.get("/change-password",verifyJWT,changePassword);

export { router as userRoutes };