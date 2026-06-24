import mongoose from 'mongoose'

/**
 * Connect to MongoDB using Mongoose.
 * - Uses MONGO_URI from environment.
 */
export async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) throw new Error('Missing MONGO_URI in environment variables')

  mongoose.set('strictQuery', true)

  await mongoose.connect(uri)

  // eslint-disable-next-line no-console
  console.log('MongoDB connected')
}

