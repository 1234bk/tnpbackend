import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "dkp9sowj0",
  api_key: process.env.CLOUDINARY_API_KEY ?? "916945622624958",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "ZLDnXkvVSkbXhYPE2dAUCSRUUr8",
});

// Upload file to cloudinary
const uploadToCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;

    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto", // ✅ auto handles images, pdfs, videos etc.
    });

    fs.unlinkSync(localFilepath); // remove local file after upload
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    if (fs.existsSync(localFilepath)) fs.unlinkSync(localFilepath);
    return null;
  }
};

// Delete file from cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const res = await cloudinary.uploader.destroy(String(publicId));
    return res;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    throw new Error("Something went wrong while deleting file from Cloudinary");
  }
};

// Extract publicId from Cloudinary URL
const publicId = async (url) => {
  try {
    const arr = url.split("/");
    const item = arr[arr.length - 1];
    const arr2 = item.split(".");
    return arr2[0];
  } catch (error) {
    console.error("PublicId extract error:", error.message);
    throw new Error("Something went wrong while getting public id");
  }
};

export { uploadToCloudinary, deleteFromCloudinary, publicId };
