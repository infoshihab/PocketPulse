// backend/middlewares/upload.js
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Memory storage (store files in memory, not disk)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("application/pdf")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image or PDF files allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });

// Middleware to upload file to Cloudinary
export const uploadToCloudinary =
  (folder = "uploads") =>
  async (req, res, next) => {
    if (!req.file) return next();

    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      req.file.cloudinaryUrl = result.secure_url;
      req.file.cloudinaryId = result.public_id;

      next();
    } catch (err) {
      next(err);
    }
  };
