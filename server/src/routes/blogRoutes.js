import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
} from '../controllers/blogController.js'

export const blogRoutes = express.Router()

// All admin routes
blogRoutes.use(authenticate, roleMiddleware('eps_admin', 'super_admin'))

blogRoutes.get('/admin', getAllBlogs)
blogRoutes.post('/', createBlog)
blogRoutes.put('/:id', updateBlog)
blogRoutes.delete('/:id', deleteBlog)
