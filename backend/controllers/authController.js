import User from "../models/userModel.js";
import DashboardItem from "../models/dashboardModel.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import transporter from "../config/nodemailer.js";
import crypto from "crypto";
import streamifier from "streamifier";

const otpStore = {};

// Register
const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload image to Cloudinary if provided
    let imageUrl;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      imageUrl = result.secure_url;
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      image: imageUrl,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, current, newPass, confirm } = req.body;
    const imageFile = req.file;

    if (!firstName || !lastName || !phone)
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });

    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;

    // Update password if provided
    if (current && newPass && confirm) {
      const match = await bcrypt.compare(current, user.password);
      if (!match)
        return res
          .status(400)
          .json({ success: false, message: "Current password incorrect" });
      if (newPass !== confirm)
        return res
          .status(400)
          .json({ success: false, message: "New passwords do not match" });
      user.password = await bcrypt.hash(newPass, 10);
    }

    // Upload new profile image
    if (imageFile) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics", overwrite: true },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(imageFile.buffer).pipe(stream);
      });
      user.image = result.secure_url;
    }

    await user.save();
    res.json({ success: true, userData: user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// For report submission
const submitReport = async (req, res) => {
  try {
    if (!req.file || !req.file.cloudinaryUrl)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    // You can now save req.file.cloudinaryUrl in DB
    res.json({
      success: true,
      message: "Report uploaded successfully",
      url: req.file.cloudinaryUrl,
    });
  } catch (error) {
    console.error("Submit Report Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Other functions (login, getprofile, dashboard routes, password reset) remain the same

export {
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
};
