import { DailyLog } from "../models/dailylogs.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllLogs = asyncHandler(async (req, res) => {
  // const logs = (await DailyLog.find()).toSorted({ date: -1 });
  const logs = await DailyLog.find().sort({ date: -1 });
  if (!logs) {
    throw new ApiError(400, "No logs found!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, logs, "Daily Logs fetched successfully"));
});

const getLogByDate = asyncHandler(async (res, req) => {
  const { date } = req.query;
  if (!date) {
    throw new ApiError(400, "Date is required");
  }
  const log = await DailyLog.findOne({ date });
  return res
    .status(200)
    .json(new ApiResponse(200, log, "Daily log fetched successfully"));
});

const createLog = asyncHandler(async (req, res) => {
  const { date, title, content } = req.body;

  if (!date || !content) {
    throw new ApiError(400, "Date and content are required!");
  }

  const existLog = await DailyLog.findOne({ date });
  if (existLog) {
    throw new ApiError(400, "Log already exist from this date.");
  }

  const log = await DailyLog.create({
    date,
    title,
    content,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, log, "log created successfully"));
});

const deleteLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const log = await DailyLog.findByIdAndDelete(id);
  if (!log) {
    throw new ApiError(400, "Log is not found ");
  }
  return res.status(200).json(new ApiResponse(200, "Log deleted successfully"));
});

const updateLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const log = await DailyLog.findById(id);

  if (!log) {
    throw new ApiError(404, "Log not found");
  }

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  log.title = title || log.title;
  log.content = content;

  const updatedLog = await log.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedLog, "Log updated successfully"));
});

export { createLog, updateLog, deleteLog, getAllLogs, getLogByDate };
