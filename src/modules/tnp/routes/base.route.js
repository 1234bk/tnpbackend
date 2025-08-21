// const express = require('express');
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import { createPost, deletepost, getAllPosts } from '../controllers/postcontrollers.js';
// import { uploadMiddleware } from '../controllers/uploadController.js';
import { addpackage, company, getallcompany, getallpackages } from '../controllers/packagecontroller.js';
import { addadmin } from '../controllers/admincontroller.js';
import { addtpomember, deletetpomember, gettpomember } from '../controllers/tpocontroller.js';
// import {  checkSuperAdmin } from '../../../middlewares/authMiddleware.js';
// import { loginUser } from '../../../middlewares/authController.js';
import { loginUser } from '../../../middlewares/authController.js';
  
 
const router = express.Router();


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary storage setup
const storage1 = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "packages_images",
    allowed_formats: ["jpg", "jpeg", "png", "gif","pdf"],
  },
});
const parser = multer({ storage: storage1 });




// get routes
router.get('/allposts', getAllPosts); 
router.get('/allpackages',getallpackages );
router.get('/company' , getallcompany);
router.get('/gettpomember' , gettpomember);



// /api/posts
router.post('/addpost', parser.single("jdFile"), createPost);        // POST /api/posts
router.post("/addpackage" , parser.single("image"), addpackage);
router.post("/company" , parser.single("image"), company);
router.post("/addadmin"  , addadmin)
router.post("/addtpomember" , addtpomember)
router.post("/login" ,loginUser)


// delete
router.delete('/deletetpomember/:id', deletetpomember );
router.delete('/deletepost/:id' , deletepost);

export default router;