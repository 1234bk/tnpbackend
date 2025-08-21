import mongoose from "mongoose";

const guestLectureSchema = new mongoose.Schema({
  teacher: { type: String, required: true },
  venue: { type: String, required: true },
  class: { type: String, required: true },
  time: { type: String, required: true },
  topic: { type: String, required: true },
  images: { type: String }, // Cloudinary link
  banner: { type: String }, // Cloudinary link
  done: { type: Boolean, default: false },
  date: { type: Date, required: true }, // when lecture will happen
  createdAt: { type: Date, default: Date.now }, // when uploaded
});

export default mongoose.model("GuestLecture", guestLectureSchema);
