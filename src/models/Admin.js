// src/models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  field: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // storing plain text for now
  isSuperAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
