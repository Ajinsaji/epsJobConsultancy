import fs from 'fs';
import path from 'path';

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath 
 */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Local Storage implementation for the Universal File Manager.
 * In the future, this can be swapped with an S3Storage or CloudinaryStorage class.
 */
export const LocalStorage = {
  /**
   * Initialize directory structures.
   */
  init: () => {
    ensureDir('./public/temp');
    ensureDir('./public/uploads/resumes');
    ensureDir('./public/uploads/logos');
    ensureDir('./public/uploads/profiles');
    ensureDir('./public/uploads/certificates');
    ensureDir('./public/uploads/documents');
  },

  /**
   * Moves a file from temp to its permanent category directory.
   * @param {string} tempPath - The current path of the file
   * @param {string} category - The category (resume, profile-image, company-logo, certificate, document)
   * @param {string} filename - The generated filename
   * @returns {string} The public URL to access the file
   */
  saveFile: (tempPath, category, filename) => {
    // Map category to directory
    let folder = 'documents';
    switch (category) {
      case 'resume': folder = 'resumes'; break;
      case 'profile-image': folder = 'profiles'; break;
      case 'company-logo': folder = 'logos'; break;
      case 'certificate': folder = 'certificates'; break;
    }

    const targetDir = path.join(process.cwd(), 'public', 'uploads', folder);
    ensureDir(targetDir);

    const destPath = path.join(targetDir, filename);
    
    // Move file
    fs.renameSync(tempPath, destPath);

    // Return the URL path
    return `/uploads/${folder}/${filename}`;
  }
};

// Initialize directories on module load
LocalStorage.init();
