import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  companyName: {
    type: String,
    
  },
  dateOfDrive: {
    type: Date,
    
  },
  role: {
    type: String,
  
  },
  time: {
    type: String,
   
  },
  venue: {
    type: String,
 
  },
  description: {
    type: String,
    
  },
  jdLink: {
    type: String,
    // Make this optional if you want
  },
  applyLink: {
    type: String,
    // Google Form link
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post