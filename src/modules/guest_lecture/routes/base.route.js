import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

import {
  createLecture,
  deleteLecture,
  getLectures,
  toggleDone,
} from "../controllers/guestLectureController.js";

const guestLectureRouter = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary storage setup
const storage2 = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "guest_lectures",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf"],
  },
});

const parser1 = multer({ storage: storage2 });

// Routes
guestLectureRouter.post(
  "/",
  parser1.fields([
    { name: "images", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createLecture
);

guestLectureRouter.get("/", getLectures);
guestLectureRouter.patch("/:id/toggle", toggleDone);
guestLectureRouter.delete("/:id", deleteLecture);

export default guestLectureRouter;
