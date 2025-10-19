import express from "express";
import {
  register,
  login,
  getprofile,
  updateProfile,
  addToDashboard,
  itemCount,
  getDashboarditems,
  deleteDashboardItem,
  sendResetCode,
  verifyResetCode,
  resetPassword,
  submitReport,
} from "../controllers/authController.js";

import { upload, uploadToCloudinary } from "../middlewares/upload.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

// Auth routes
userRouter.post(
  "/signup",
  upload.single("image"),
  uploadToCloudinary("profile_pics"),
  register
);
userRouter.post("/login", login);
userRouter.post("/profile", authUser, getprofile);
userRouter.put(
  "/update-profile",
  authUser,
  upload.single("image"),
  uploadToCloudinary("profile_pics"),
  updateProfile
);

// Dashboard routes
userRouter.post("/dashboard/my", authUser, itemCount);
userRouter.post("/dashboard/add", authUser, addToDashboard);
userRouter.post("/dashboard/my-items", authUser, getDashboarditems);
userRouter.delete("/dashboard/:id", authUser, deleteDashboardItem);

// Report route
userRouter.post(
  "/submit",
  authUser,
  upload.single("file"),
  uploadToCloudinary("reports"),
  submitReport
);

// Password reset
userRouter.post("/forgot-password", sendResetCode);
userRouter.post("/verify-otp", verifyResetCode);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
