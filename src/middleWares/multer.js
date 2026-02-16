import multer from 'multer';



export const uploadimage = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
    fieldSize: 25 * 1024 * 1024,
    files: 4,
    field: 100
  },
  storage: multer.memoryStorage()
});