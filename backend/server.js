import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const allowedOrigins = [
  "http://localhost:5173",
 // "https://pocketpulse-vrkx.onrender.com",
  "https://www.pocketpuls.com",
  "https://pocketpuls.com",
  //"https://pocketpulse-1.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("🚫 Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/user", userRouter);

// Health check route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend works on Vercel!" });
});

// ✅ Export app for Vercel (Do NOT use app.listen)
export default app;
