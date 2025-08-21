import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// const result = await cloudinary.uploader.upload(filePath, {
//   resource_type: "raw", // for PDFs and other non-images
//   folder: "job_descriptions"
// });

// console.log(result.secure_url);
console.log("Cloudinary Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);

export default cloudinary;
