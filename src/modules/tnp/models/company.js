import mongoose from "mongoose";

const companyschema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


const Company = mongoose.model("Company", companyschema);
export default Company