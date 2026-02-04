import { DailyLog } from "../models/dailylogs.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllLogs = asyncHandler(async (req, res) => {
  try {
    const logs = (await DailyLog.find()).toSorted({ date: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, logs, "Daily Logs fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "failed to fetch daily logs");
  }
});

const getLogByDate = asyncHandler(async (res, req) => {
  try {
    const { date } = req.query;
    if (!date) {
      throw new ApiError(400, "Date is required");
    }
    const log = await DailyLog.findOne({ date });
    return res
      .status(200)
      .json(new ApiResponse(200, log, "Daily log fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "failed to fetch daily log");
  }
});

const createLog = asyncHandler(async (req, res) => {
  try {
    const { date, title, content } = req.body;

    if (!date || !content) {
      throw new ApiError(400, "Date and content are required!");
    }

    const existLog = await DailyLog.findOne({ date });
    if (existLog) {
      throw new ApiError(400, "Log already exist fro this date.");
    }

    const log = await DailyLog.create({
      date,
      title,
      content,
    });


    return res
      .status(201)
      .json(new ApiResponse(201, log, "log created successfully"));
  } catch (error) {
    throw new ApiError(500, "failed to create daily log");
  }
});

const deleteLog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const log = await DailyLog.findByIdAndDelete(id);
    if (!log) {
      throw new ApiError(400, "Log is not found ");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Log deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "failed to delete daily log");
  }
});


const updateLog = asyncHandler(async(req,res) => {
    try {
        const {id} = req.params;
        const {title,content} = req.body;
    
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
    } catch (error) {
       throw new ApiError(500,"failed to update log") 
    }
});

export {
    createLog,
    updateLog,
    deleteLog,
    getAllLogs,
    getLogByDate
};