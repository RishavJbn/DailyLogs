import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user.routes.js";
import { logRoutes } from "./routes/dailyLogs.routes.js";

const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite frontend
    credentials: true,
  }),
);


app.use(express.json({ limit: "16kb" }));
app.use(express.static("public")); 
app.use(express.urlencoded({ limit: "16kb" })); //express.
app.use(cookieParser());


//routes declaration
app.use("/api/v1/dailylog",logRoutes );
app.use("/api/v1/user",userRoutes );

//https://localhost:8000/api/v1/dailylog
export { app };
