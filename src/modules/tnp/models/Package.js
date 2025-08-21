import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


const Package = mongoose.model("Package", packageSchema);
export default Package