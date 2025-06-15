import multer from 'multer'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = './uploads/'
         // Add more detailed logging
        console.log('File being processed:', {
            fieldname: file.fieldname,
            originalname: file.originalname,
            mimetype: file.mimetype
        });

        if (file.fieldname === 'gallery') {
            uploadPath += 'gallery';
        } else if (file.fieldname === 'content') {
            uploadPath += 'content';
        }
        
        // Ensure directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let prefix = 'file-';
        if (file.fieldname === 'gallery') prefix = 'gallery-';
        else if (file.fieldname === 'content') prefix = 'content-';
        
        const extension = path.extname(file.originalname) || '.' + file.mimetype.split('/')[1];
        cb(null, prefix + uniqueSuffix + extension);
    }
});

const fileFilter = (req, file, cb) => {
    // Fix: Check for actual MIME types, not fieldname-based MIME types
    if (file.fieldname === 'gallery' && file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else if (file.fieldname === 'content' && (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype.startsWith('audio/'))) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type for ${file.fieldname}. Received: ${file.mimetype}`), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 30 * 1024 * 1024, // 30MB limit per file
        files: 1 // Allow only 1 file
    }
});

export default upload;