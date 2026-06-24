import { asyncHandler } from '../utils/asyncHandler.js'
import { Company } from '../models/Company.js'
import { User } from '../models/User.js'
import bcrypt from 'bcryptjs'

// Generate a random 14-char password
function generateSecurePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let pass = ''
  for (let i = 0; i < 14; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return pass
}

export const getMyCompany = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ userId: req.user._id }).lean()
  res.json({ company })
})

export const getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({}).populate('userId', 'email username').lean()
  res.json({ companies })
})

export const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id).populate('userId', 'email username').lean()
  if (!company) return res.status(404).json({ message: 'Company not found' })

  // Security check: company role can only view their own
  if (req.user.role === 'company') {
    const myCompany = await Company.findOne({ userId: req.user._id }).lean()
    if (!myCompany || myCompany._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Forbidden: access denied' })
    }
  }

  res.json({ company })
})

export const createCompany = asyncHandler(async (req, res) => {
  const { companyName, contactPerson, email, phone, address, industry, website } = req.body

  if (!companyName || !email) {
    return res.status(400).json({ message: 'Company name and email are required' })
  }

  // Check if email already registered in Users
  const exists = await User.findOne({ email })
  if (exists) {
    return res.status(409).json({ message: 'Email is already registered' })
  }

  // Generate username: company_<cleanName>_<randomDigits>
  const cleanName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const randomDigits = Math.floor(1000 + Math.random() * 9000)
  const username = `company_${cleanName}_${randomDigits}`

  // Generate secure password
  const tempPassword = generateSecurePassword()
  const passwordHash = await bcrypt.hash(tempPassword, 10)

  // Create User
  const user = await User.create({
    name: companyName,
    email,
    username,
    phone,
    password: passwordHash,
    role: 'company',
    mustChangePassword: true,
    isVerified: true,
  })

  // Create Company Profile
  const company = await Company.create({
    userId: user._id,
    companyName,
    contactPerson,
    email,
    phone,
    address,
    industry,
    website,
    location: address || '', // backward compatibility
    verified: true,
  })

  res.status(201).json({
    message: 'Company created successfully',
    company,
    credentials: {
      email,
      username,
      temporaryPassword: tempPassword,
    },
  })
})

export const updateCompanyProfile = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Security check: company role can only edit their own
  if (req.user.role === 'company') {
    const myCompany = await Company.findOne({ userId: req.user._id }).lean()
    if (!myCompany || myCompany._id.toString() !== id) {
      return res.status(403).json({ message: 'Forbidden: cannot modify other company profiles' })
    }
  }

  const updated = await Company.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  )

  if (!updated) return res.status(404).json({ message: 'Company not found' })
  res.json({ company: updated })
})

export const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id)
  if (!company) return res.status(404).json({ message: 'Company not found' })

  // Delete associated user
  await User.findByIdAndDelete(company.userId)
  await Company.findByIdAndDelete(req.params.id)

  res.json({ message: 'Company deleted successfully' })
})


