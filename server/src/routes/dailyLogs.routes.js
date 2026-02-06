import { Router } from "express";
import {
  getAllLogs,
  getLogByDate,
  createLog,
  updateLog,
  deleteLog,
} from "../controllers/dailylogs.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// GET all logs
router.get("/",verifyJWT , getAllLogs);

// GET log by date → /logs?date=YYYY-MM-DD
router.get("/by-date",verifyJWT , getLogByDate);

// CREATE new log
router.post("/",verifyJWT , createLog);

// UPDATE log by id
router.put("/:id",verifyJWT , updateLog);

// DELETE log by id
router.delete("/:id",verifyJWT , deleteLog);

export { router as logRoutes };
