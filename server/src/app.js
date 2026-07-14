import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user.routes.js";
import { logRoutes } from "./routes/dailyLogs.routes.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "16kb" })); //express.
app.use(cookieParser());

//routes declaration
app.use("/api/v1/dailylog", logRoutes);
app.use("/api/v1/user", userRoutes);

//https://localhost:8000/api/v1/dailylog
export { app };
