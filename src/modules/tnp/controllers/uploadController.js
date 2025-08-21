import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'job_descriptions',
    resource_type: 'raw',   // Use 'raw' for PDFs, not 'araw'
        format: 'pdf', // ✅ force .pdf extension
    allowed_formats: ['pdf'],
  },
});

const upload = multer({ storage });

export const uploadMiddleware = upload.single('jdFile'); // 'jdFile' will be the field name in form-data
