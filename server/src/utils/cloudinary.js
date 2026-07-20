import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )
}

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

/**
 * Upload a local file to Cloudinary and return the secure URL.
 * Automatically deletes the local file after upload.
 */
export const uploadOnCloudinary = async (localFilePath, folder = 'eps') => {
  try {
    if (!localFilePath) return null
    if (!isCloudinaryConfigured()) {
      const error = new Error('Cloudinary is not configured. Missing API keys.')
      error.statusCode = 503
      throw error
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
      folder,
    })

    // Delete local file
    fs.unlinkSync(localFilePath)
    return response.secure_url
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath)
    }
    console.error('Cloudinary upload failed:', error)
    return null
  }
}
