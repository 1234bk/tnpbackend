import Post from "../models/posts.js";

import { uploadToCloudinary } from "../../../utils/cloudinary.js"; // adjust path
import cloudinary from "../config/cloudinary.js";
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

  console.log("Incoming body:", req.body);
    console.log("Incoming file:", req.file);

  try {
    
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

    let jdLink = null;
      if (req.file) {
      // Upload PDF to Cloudinary (raw resource)
      const result = await cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "job_pdfs",
          public_id: `${Date.now()}_${req.file.originalname}`
        },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ error: error.message });
          }
          jdLink = result.secure_url;

          // Save post after PDF upload
          const newPost = new Post({
            companyName,
            dateOfDrive,
            role,
            time,
            venue,
            description,
            applyLink,
            jdLink,
          });
          await newPost.save();
          console.log("Post saved with PDF:", newPost);
          return res.status(201).json({ message: "Post created successfully!", post: newPost });
        }
      );

      // Send buffer to upload_stream
      result.end(req.file.buffer);
      return; // exit here, response will be sent in callback
    } else {
      // Save post without PDF
      const newPost = new Post({ companyName, dateOfDrive, role, time, venue, description, applyLink });
      await newPost.save();
      console.log("Post saved without PDF:", newPost);
      return res.status(201).json({ message: "Post created successfully!", post: newPost });
    }
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ error: error.message });
  }

  //   if (req.file) {
  //     // Upload PDF to Cloudinary as raw
  //     const result = await cloudinary.uploader.upload_stream(
  //       { resource_type: "raw", folder: "job_pdfs" },
  //       (error, result) => {
  //         if (error) throw error;
  //         jdLink = result.secure_url;
  //       }
  //     );

  //     // / Convert buffer to stream
  //     const stream = cloudinary.uploader.upload_stream(
  //       { resource_type: "raw", folder: "job_pdfs" },
  //       (error, result) => {
  //         if (error) return res.status(500).json({ error: error.message });
  //         jdLink = result.secure_url;
  //         savePost();
  //       }
  //     );

  //     stream.end(req.file.buffer);
  //     const savePost = async () => {
  //       const newPost = new Post({ companyName, dateOfDrive, role, time, venue, description, applyLink, jdLink });
  //       await newPost.save();
  //       console.log("Saved Post:", newPost);
  //       return res.status(201).json({ message: "Post created successfully!", post: newPost });
  //     };

  //     return; 
  //     } else {
  //     // If no PDF
  //     const newPost = new Post({ companyName, dateOfDrive, role, time, venue, description, applyLink });
  //     await newPost.save();
  //     console.log("Saved Post without PDF:", newPost);
  //     return res.status(201).json({ message: "Post created successfully!", post: newPost });
  //   }


  // } catch (error) {
  //   console.error("Create post error:", error.message, error);
  //   res.status(500).json({ error: error.message });
  // }
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

