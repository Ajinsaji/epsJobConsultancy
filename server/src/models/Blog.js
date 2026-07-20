import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    coverImage: { type: String, default: null },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Archived'],
      default: 'Draft',
    },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
)

// Generate slug before saving if not present
BlogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }
  next()
})

export const Blog = mongoose.model('Blog', BlogSchema)
