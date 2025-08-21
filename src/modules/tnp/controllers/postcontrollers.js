import Post from "../models/posts.js";

import { uploadToCloudinary } from "../../../utils/cloudinary.js"; // adjust path
// GET all posts

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const skip = limit ? (page - 1) * limit : 0;

    let query = Post.find().sort({ postedAt: -1 }).skip(skip);

    if (limit) {
      query = query.limit(limit);
    }

    const posts = await query;
    // console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Server error while fetching posts" });
  }
};



export const createPost = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    console.log("Incoming file:", req.file);

    const {
      companyName,
      dateOfDrive,
      role,
      time,
      venue,
      description,
      applyLink,
    } = req.body;

    if (!companyName || !dateOfDrive || !time || !venue || !description) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    console.log("req.file : ",req.file)

    let jdLink = null;
    if (req.file?.path) {
      const cloudinaryRes = await uploadToCloudinary(req.file.path);
      jdLink = cloudinaryRes?.secure_url || null;
    }

    const newPost = new Post({
      companyName,
      dateOfDrive,
      role,
      time,
      venue,
      description,
      applyLink,
      jdLink, // ✅ now Cloudinary PDF URL
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully with PDF",
      post: newPost,
    });
  } catch (error) {
    console.error("Create post error:", error.message, error);
    res.status(500).json({ error: error.message });
  }
};

export const deletepost = async (req, res) => {
    try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
}

