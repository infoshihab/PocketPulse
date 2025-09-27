import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import "./config/cloudinary.js";

import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// CORS middleware - allow your frontend only
const allowedOrigin = process.env.VITE_FRONTEND_URL; // set this in your .env

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

// API routes
app.use("/api/user", userRouter);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend works!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
