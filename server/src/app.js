import express from "express";
import cors from "cors";


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

import router from "./routes/dailyLogs.routes.js";

//routes declaration
app.use("/api/v1/dailylog", router);

//https://localhost:8000/api/v1/dailylog
export { app };
