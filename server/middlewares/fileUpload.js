const multer = require('multer');

// Configure Multer storage
const storage = multer.memoryStorage(); // Use memory storage instead of disk storage for temporary files
export const upload = multer({ storage });
