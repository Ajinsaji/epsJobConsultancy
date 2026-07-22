import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const parseResume = async (fileUrl) => {
  try {
    let dataBuffer;

    if (fileUrl.startsWith('http')) {
      // It's a remote URL
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      dataBuffer = response.data;
    } else {
      // It's a local file path relative to server root
      // E.g., /uploads/candidate/resume.pdf
      const localPath = path.join(process.cwd(), fileUrl);
      if (!fs.existsSync(localPath)) {
        throw new Error(`File not found: ${localPath}`);
      }
      dataBuffer = fs.readFileSync(localPath);
    }

    const data = await pdfParse(dataBuffer);
    
    // Quick sanitization
    let text = data.text.replace(/\n\s*\n/g, '\n').trim();
    return text;
  } catch (error) {
    console.error('[ResumeParser] Error parsing resume:', error);
    throw new Error('Failed to parse resume text');
  }
};
