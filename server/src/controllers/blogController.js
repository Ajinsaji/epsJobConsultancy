import { asyncHandler } from '../utils/asyncHandler.js'
import { Blog } from '../models/Blog.js'

export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, coverImage, tags, status, seo } = req.body

  const blog = await Blog.create({
    title,
    content,
    excerpt,
    coverImage,
    tags,
    status: status || 'Draft',
    seo,
    author: req.user._id,
    publishedAt: status === 'Published' ? new Date() : undefined,
  })

  res.status(201).json({ blog })
})

export const updateBlog = asyncHandler(async (req, res) => {
  const { title, slug, content, excerpt, coverImage, tags, status, seo } = req.body

  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).json({ message: 'Blog not found' })

  if (title) blog.title = title
  if (slug) blog.slug = slug
  if (content) blog.content = content
  if (excerpt !== undefined) blog.excerpt = excerpt
  if (coverImage !== undefined) blog.coverImage = coverImage
  if (tags) blog.tags = tags
  if (status) {
    if (status === 'Published' && blog.status !== 'Published') {
      blog.publishedAt = new Date()
    }
    blog.status = status
  }
  if (seo) blog.seo = seo

  const updated = await blog.save()
  res.json({ blog: updated })
})

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  if (!blog) return res.status(404).json({ message: 'Blog not found' })
  res.json({ message: 'Blog deleted successfully' })
})

// Public endpoint for blog lists
export const getBlogs = asyncHandler(async (req, res) => {
  const { status, limit = 10, page = 1 } = req.query
  const query = {}
  
  if (status) query.status = status
  else query.status = 'Published' // default public view

  const blogs = await Blog.find(query)
    .populate('author', 'name')
    .sort({ publishedAt: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean()

  const total = await Blog.countDocuments(query)

  res.json({ blogs, total, pages: Math.ceil(total / limit) })
})

// Admin endpoint to view all blogs
export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({})
    .populate('author', 'name')
    .sort({ createdAt: -1 })
    .lean()

  res.json({ blogs })
})

// Public endpoint for single blog
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name')
  if (!blog) return res.status(404).json({ message: 'Blog not found' })

  // Increment views
  blog.views += 1
  await blog.save()

  res.json({ blog })
})
