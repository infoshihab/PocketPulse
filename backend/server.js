import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import "./config/cloudinary.js";

import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = 8000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const allowedOrigins = [
  "https://pocketpulsefrontend.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
