import { Router } from "express";
import {
  getAllLogs,
  getLogByDate,
  createLog,
  updateLog,
  deleteLog,
} from "../controllers/dailylogs.controllers.js";

const router = Router();

// GET all logs
router.get("/", getAllLogs);

// GET log by date → /logs?date=YYYY-MM-DD
router.get("/by-date", getLogByDate);

// CREATE new log
router.post("/", createLog);

// UPDATE log by id
router.put("/:id", updateLog);

// DELETE log by id
router.delete("/:id", deleteLog);

export default router;
