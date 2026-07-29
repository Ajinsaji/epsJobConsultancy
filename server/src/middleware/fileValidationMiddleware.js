import path from 'path'

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.webp'])
const ALLOWED_MIMES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/webp',
])

// Magic byte signatures for strict binary validation
const MAGIC_BYTES = {
  pdf: [0x25, 0x50, 0x44, 0x46], // %PDF
  png: [0x89, 0x50, 0x4e, 0x47], // .PNG
  jpeg: [0xff, 0xd8, 0xff],       // JPEG
  webp: [0x52, 0x49, 0x46, 0x46], // RIFF (WEBP)
}

export function validateFileUpload(req, res, next) {
  if (!req.file && !req.files) {
    return next()
  }

  const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : [req.file]

  for (const file of files) {
    const ext = path.extname(file.originalname).toLowerCase()

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return res.status(400).json({
        message: `File extension '${ext}' is not permitted. Allowed extensions: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}`,
      })
    }

    if (file.mimetype && !ALLOWED_MIMES.has(file.mimetype)) {
      return res.status(400).json({
        message: `MIME type '${file.mimetype}' is invalid. Allowed formats: PDF, DOC, DOCX, PNG, JPG, WEBP.`,
      })
    }

    // Magic Bytes Verification if buffer is available
    if (file.buffer && file.buffer.length >= 4) {
      const buf = file.buffer
      let isValidMagic = true

      if (ext === '.pdf') {
        isValidMagic = MAGIC_BYTES.pdf.every((b, i) => buf[i] === b)
      } else if (ext === '.png') {
        isValidMagic = MAGIC_BYTES.png.every((b, i) => buf[i] === b)
      } else if (ext === '.jpg' || ext === '.jpeg') {
        isValidMagic = MAGIC_BYTES.jpeg.every((b, i) => buf[i] === b)
      }

      if (!isValidMagic) {
        return res.status(400).json({
          message: `Security Warning: File content magic signature does not match extension '${ext}'. Upload rejected.`,
        })
      }
    }
  }

  return next()
}
