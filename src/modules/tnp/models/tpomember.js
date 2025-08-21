import mongoose from "mongoose";

const tpoMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true }
}, { timestamps: true });

const TpoMember = mongoose.model("TpoMember", tpoMemberSchema);

export default TpoMember;
