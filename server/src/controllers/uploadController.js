import { LocalStorage } from '../utils/storage/localStorage.js';

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { category = 'document' } = req.body;
    
    // Save to permanent storage from temp using the local storage abstraction
    const finalUrl = LocalStorage.saveFile(req.file.path, category, req.file.filename);

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        id: req.file.filename,
        url: finalUrl,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};
