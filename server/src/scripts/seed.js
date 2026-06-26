import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import { User } from '../models/User.js'
import { Company } from '../models/Company.js'
import { Job } from '../models/Job.js'
import { Placement } from '../models/Placement.js'
import { Testimonial } from '../models/Testimonial.js'
import { FAQ } from '../models/FAQ.js'
import { Service } from '../models/Service.js'
import { HomepageConfig } from '../models/HomepageConfig.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../.env') })

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eps'

// Simple password hashing replacement or direct bypass for test seeding
// Note: real authentication uses bcrypt, we can use a mock hash or direct value since they are seeding users
const MOCK_PASSWORD_HASH = '$2a$10$rB3Q9.MUp1iHhPZpC8tNcuK7X5QyqXfKszY/sKj2Vw0C4aOshsS/W' // 'password123'

async function seed() {
  console.log('Connecting to database:', MONGO_URI)
  await mongoose.connect(MONGO_URI)
  console.log('Database connected!')

  // Clear existing collections
  console.log('Clearing existing CMS database collections...')
  await Promise.all([
    User.deleteMany({ email: { $in: [
      'admin@eps.jobs', 
      'recruiter@vercel.com', 
      'recruiter@linear.app', 
      'recruiter@stripe.com',
      'recruiter@supabase.com',
      'recruiter@retool.com',
      'recruiter@posthog.com'
    ] } }),
    Company.deleteMany({ companyName: { $in: ['Vercel', 'Linear', 'Stripe', 'Retool', 'Supabase', 'PostHog'] } }),
    Job.deleteMany({ title: { $in: [
      'Senior React Developer',
      'Senior Node.js Engineer',
      'Lead Product Designer',
      'Developer Relations Engineer',
      'Growth Engineer',
      'Frontend Developer Intern'
    ] } }),
    Placement.deleteMany({}),
    Testimonial.deleteMany({}),
    FAQ.deleteMany({}),
    Service.deleteMany({}),
    HomepageConfig.deleteMany({})
  ])

  // 1. Create Admins and Company Users
  console.log('Seeding Users...')
  const adminUser = await User.create({
    name: 'EPS System Administrator',
    email: 'admin@eps.jobs',
    phone: '+91 9876543210',
    password: MOCK_PASSWORD_HASH,
    role: 'eps_admin',
    isVerified: true,
    status: 'Active'
  })

  const vercelUser = await User.create({
    name: 'Vercel HR Team',
    email: 'recruiter@vercel.com',
    password: MOCK_PASSWORD_HASH,
    role: 'company',
    isVerified: true,
    status: 'Active'
  })

  const linearUser = await User.create({
    name: 'Linear Recruiting',
    email: 'recruiter@linear.app',
    password: MOCK_PASSWORD_HASH,
    role: 'company',
    isVerified: true,
    status: 'Active'
  })

  const stripeUser = await User.create({
    name: 'Stripe Global Hiring',
    email: 'recruiter@stripe.com',
    password: MOCK_PASSWORD_HASH,
    role: 'company',
    isVerified: true,
    status: 'Active'
  })

  const supabaseUser = await User.create({
    name: 'Supabase Engineering Hiring',
    email: 'recruiter@supabase.com',
    password: MOCK_PASSWORD_HASH,
    role: 'company',
    isVerified: true,
    status: 'Active'
  })

  const retoolUser = await User.create({
    name: 'Retool People Team',
    email: 'recruiter@retool.com',
    password: MOCK_PASSWORD_HASH,
    role: 'company',
    isVerified: true,
    status: 'Active'
  })

  const posthogUser = await User.create({
    name: 'PostHog Operations Team',
    email: 'recruiter@posthog.com',
    password: MOCK_PASSWORD_HASH,
    role: 'company',
    isVerified: true,
    status: 'Active'
  })

  // 2. Create Companies
  console.log('Seeding Companies...')
  const vercel = await Company.create({
    userId: vercelUser._id,
    companyName: 'Vercel',
    industry: 'Cloud Infrastructure',
    location: 'Remote, Global',
    contactPerson: 'Sarah Jenkins',
    email: 'hiring@vercel.com',
    phone: '+1 555-019-2834',
    website: 'https://vercel.com',
    verified: true,
    isPartner: true,
    showOnHomepage: true,
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop&q=80', // Premium visual placeholder
    companySize: '500-1000 employees',
    displayOrder: 1
  })

  const stripe = await Company.create({
    userId: stripeUser._id,
    companyName: 'Stripe',
    industry: 'Fintech Payments',
    location: 'San Francisco, CA',
    contactPerson: 'Marcus Aurelius',
    email: 'jobs@stripe.com',
    phone: '+1 555-012-3456',
    website: 'https://stripe.com',
    verified: true,
    isPartner: true,
    showOnHomepage: true,
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&h=120&fit=crop&q=80',
    companySize: '1000-5000 employees',
    displayOrder: 2
  })

  const linear = await Company.create({
    userId: linearUser._id,
    companyName: 'Linear',
    industry: 'Software Tooling',
    location: 'Remote, US/EU',
    contactPerson: 'Elena Rostova',
    email: 'talent@linear.app',
    phone: '+1 555-034-7890',
    website: 'https://linear.app',
    verified: true,
    isPartner: true,
    showOnHomepage: true,
    logo: 'https://images.unsplash.com/photo-1618005198143-d5660b641200?w=120&h=120&fit=crop&q=80',
    companySize: '50-100 employees',
    displayOrder: 3
  })

  const supabase = await Company.create({
    userId: supabaseUser._id,
    companyName: 'Supabase',
    industry: 'Backend Databases',
    location: 'Singapore / Remote',
    contactPerson: 'Rohan Das',
    email: 'careers@supabase.io',
    phone: '+65 9123-4567',
    website: 'https://supabase.com',
    verified: true,
    isPartner: true,
    showOnHomepage: true,
    logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=120&h=120&fit=crop&q=80',
    companySize: '100-200 employees',
    displayOrder: 4
  })

  const retool = await Company.create({
    userId: retoolUser._id,
    companyName: 'Retool',
    industry: 'Internal Tooling Builder',
    location: 'San Francisco / Remote',
    contactPerson: 'Amanda Cole',
    email: 'people@retool.com',
    website: 'https://retool.com',
    verified: true,
    isPartner: true,
    showOnHomepage: true,
    logo: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=120&h=120&fit=crop&q=80',
    companySize: '200-500 employees',
    displayOrder: 5
  })

  const posthog = await Company.create({
    userId: posthogUser._id,
    companyName: 'PostHog',
    industry: 'Product Analytics',
    location: 'Remote',
    contactPerson: 'James Hawkins',
    email: 'hiring@posthog.com',
    website: 'https://posthog.com',
    verified: true,
    isPartner: true,
    showOnHomepage: true,
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop&q=80',
    companySize: '50-100 employees',
    displayOrder: 6
  })

  // 3. Create Jobs
  console.log('Seeding Jobs...')
  await Job.create([
    {
      title: 'Senior React Developer',
      description: 'Build core next-generation web dashboard features using Next.js, React Server Components, and Tailwind CSS. Ensure high-performance styling and state management integrations.',
      companyId: vercel._id,
      createdBy: vercelUser._id,
      salary: '$130,000 - $160,000 / year',
      location: 'Remote, US / Europe',
      experience: '5+ years',
      skills: ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'Webpack'],
      skillsRequired: ['React', 'Next.js', 'TypeScript'],
      jobType: 'Full-time',
      workMode: 'Remote',
      openings: 2,
      status: 'Open',
      isActive: true
    },
    {
      title: 'Senior Node.js Engineer',
      description: 'Architect scalable PostgreSQL database orchestration APIs and real-time websockets backends using Node.js, Express, and Docker. Optimize server response times.',
      companyId: supabase._id,
      createdBy: supabaseUser._id,
      salary: '$110,000 - $140,000 / year',
      location: 'Remote, Global',
      experience: '4+ years',
      skills: ['Node.js', 'PostgreSQL', 'Websockets', 'Express', 'Redis', 'Docker'],
      skillsRequired: ['Node.js', 'PostgreSQL', 'Express'],
      jobType: 'Full-time',
      workMode: 'Remote',
      openings: 1,
      status: 'Open',
      isActive: true
    },
    {
      title: 'Lead Product Designer',
      description: 'Define the design system guidelines and UX roadmap for Linear issues tracking desktop app. Conduct user research and create high-fidelity responsive Figma mockups.',
      companyId: linear._id,
      createdBy: linearUser._id,
      salary: '$120,000 - $150,000 / year',
      location: 'Remote, Europe / US East',
      experience: '6+ years',
      skills: ['Product Design', 'Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
      skillsRequired: ['Product Design', 'Figma', 'UI/UX'],
      jobType: 'Full-time',
      workMode: 'Remote',
      openings: 1,
      status: 'Open',
      isActive: true
    },
    {
      title: 'Developer Relations Engineer',
      description: 'Write developer guides, speak at global conferences, and build interactive open-source MERN stack payment checkout integrations to improve developer experiences on Stripe.',
      companyId: stripe._id,
      createdBy: stripeUser._id,
      salary: '$100,000 - $130,000 / year',
      location: 'San Francisco, CA / Remote',
      experience: '3+ years',
      skills: ['Developer Relations', 'MERN Stack', 'JavaScript', 'Technical Writing', 'Public Speaking'],
      skillsRequired: ['JavaScript', 'Technical Writing'],
      jobType: 'Full-time',
      workMode: 'Hybrid',
      openings: 1,
      status: 'Open',
      isActive: true
    },
    {
      title: 'Growth Engineer',
      description: 'Optimize user onboarding funnels, implement A/B testing frameworks, and integrate product marketing analytics triggers in React and Python.',
      companyId: posthog._id,
      createdBy: posthogUser._id,
      salary: '$90,000 - $120,000 / year',
      location: 'Remote, UK / Europe',
      experience: '3+ years',
      skills: ['React', 'Python', 'A/B Testing', 'Product Analytics', 'Growth Marketing'],
      skillsRequired: ['React', 'Python'],
      jobType: 'Full-time',
      workMode: 'Remote',
      openings: 1,
      status: 'Open',
      isActive: true
    },
    {
      title: 'Frontend Developer Intern',
      description: 'Support the development of custom responsive React widgets and low-code drag-and-drop builder features. Participate in daily standups and UI code reviews.',
      companyId: retool._id,
      createdBy: retoolUser._id,
      salary: '$4,000 - $6,000 / month',
      location: 'San Francisco, CA',
      experience: '1+ years',
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'CSS Grid'],
      skillsRequired: ['React', 'JavaScript'],
      jobType: 'Internship',
      workMode: 'On-site',
      openings: 3,
      status: 'Open',
      isActive: true
    }
  ])

  // 4. Seeding Placements
  console.log('Seeding Placements...')
  await Placement.create([
    {
      candidateName: 'Aravind Nair',
      candidatePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
      companyName: 'Vercel',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=60&h=60&fit=crop&q=80',
      position: 'Senior Full Stack Engineer',
      salary: '₹18,00,000 LPA',
      joiningDate: new Date('2026-05-10'),
      displayOrder: 1,
      isActive: true
    },
    {
      candidateName: 'Meera Nair',
      candidatePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
      companyName: 'Linear',
      companyLogo: 'https://images.unsplash.com/photo-1618005198143-d5660b641200?w=60&h=60&fit=crop&q=80',
      position: 'UI/UX Product Designer',
      salary: '₹14,50,000 LPA',
      joiningDate: new Date('2026-06-01'),
      displayOrder: 2,
      isActive: true
    },
    {
      candidateName: 'Rohan Das',
      candidatePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
      companyName: 'Supabase',
      companyLogo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=60&h=60&fit=crop&q=80',
      position: 'Backend Node.js Developer',
      salary: '₹12,00,000 LPA',
      joiningDate: new Date('2026-05-20'),
      displayOrder: 3,
      isActive: true
    },
    {
      candidateName: 'Priya Sharma',
      candidatePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80',
      companyName: 'Stripe',
      companyLogo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=60&h=60&fit=crop&q=80',
      position: 'QA Automation Engineer',
      salary: '₹10,50,000 LPA',
      joiningDate: new Date('2026-06-15'),
      displayOrder: 4,
      isActive: true
    }
  ])

  // 5. Seeding Testimonials
  console.log('Seeding Testimonials...')
  await Testimonial.create([
    {
      name: 'Sarah Jenkins',
      role: 'Senior React Engineer',
      company: 'Vercel',
      message: 'EPS helped me refine my MERN stack resume, matched me with Vercel, and supported me through two rounds of technical interviews. I got my job offer in less than 2 weeks!',
      rating: 5,
      isActive: true,
      displayOrder: 1,
      type: 'candidate',
      featured: true
    },
    {
      name: 'David Chen',
      role: 'Frontend Developer',
      company: 'Retool',
      message: 'The match score calculation was incredibly accurate. I only applied to high-match jobs and landed interviews at three amazing companies. EPS candidate coordination is top-tier.',
      rating: 5,
      isActive: true,
      displayOrder: 2,
      type: 'candidate',
      featured: true
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Talent',
      company: 'Linear',
      message: 'EPS has streamlined our engineering recruitment. Their pre-screened MERN candidates are consistently high-signal, which reduced our time-to-hire by over 40% this quarter.',
      rating: 5,
      isActive: true,
      displayOrder: 1,
      type: 'employer',
      featured: true
    },
    {
      name: 'Marcus Aurelius',
      role: 'Director of Engineering',
      company: 'Stripe',
      message: 'Instead of sorting through hundreds of unqualified resumes, EPS sends us a curated shortlist of verified, high-quality developers. Their scheduling and feedback coordination is seamless.',
      rating: 5,
      isActive: true,
      displayOrder: 2,
      type: 'employer',
      featured: true
    }
  ])

  // 6. Seeding FAQs
  console.log('Seeding FAQs...')
  await FAQ.create([
    {
      question: 'How does EPS Job Consultancy differ from traditional job portals?',
      answer: 'Unlike Naukri or LinkedIn which are self-serve job boards, EPS acts as a hybrid recruitment platform. We combine smart candidate matching tools with a dedicated HR screening and interview coordination team to ensure high-signal hiring for companies and high-success placement for candidates.',
      displayOrder: 1,
      isActive: true
    },
    {
      question: 'Is there any fee for candidates registering on EPS?',
      answer: 'No, candidate registration, resume upload, and job applications are 100% free. We also offer complimentary AI resume scoring and interview preparation support to help you get hired.',
      displayOrder: 2,
      isActive: true
    },
    {
      question: 'How do employers search and contact candidates?',
      answer: 'Employers can register their companies, post active job listings, and search our talent pool. Once you find a suitable profile, you can request an interview or ask EPS consultancy team to perform pre-screening and coordinate schedules.',
      displayOrder: 3,
      isActive: true
    },
    {
      question: 'What kind of consultancy support does EPS provide?',
      answer: 'We provide comprehensive HR consultancy, including resume screening, telephone pre-interviews, technical assessments, reference checks, and interview scheduling coordination between candidates and companies.',
      displayOrder: 4,
      isActive: true
    }
  ])

  // 7. Seeding Services
  console.log('Seeding Services...')
  await Service.create([
    {
      title: 'Executive Search & Recruitment',
      description: 'End-to-end recruitment consultancy matching top-tier leadership and technical talent with fast-growing companies.',
      icon: 'Briefcase',
      displayOrder: 1,
      isActive: true
    },
    {
      title: 'Candidate Screening & Assessment',
      description: 'Rigorous technical and behavioral evaluation processes to ensure only high-signal candidates reach the hiring managers.',
      icon: 'ShieldCheck',
      displayOrder: 2,
      isActive: true
    },
    {
      title: 'Interview Coordination',
      description: 'Seamless scheduling, calendar alignment, feedback management, and follow-up support for both candidates and employers.',
      icon: 'CalendarDays',
      displayOrder: 3,
      isActive: true
    },
    {
      title: 'AI-Powered Smart Matching',
      description: 'Advanced semantic screening of resumes against job requirements to calculate instant suitability and match scores.',
      icon: 'Cpu',
      displayOrder: 4,
      isActive: true
    }
  ])

  // 8. Seeding HomepageConfig
  console.log('Seeding HomepageConfig...')
  await HomepageConfig.create({
    key: 'main',
    heroBadge: 'Trusted Recruitment Partner',
    heroHeadline: 'Find Jobs. Hire Talent. Grow Faster.',
    heroSubheading: 'EPS Job Consultancy is a hybrid recruitment platform that bridges the gap between top-tier talent and leading companies.',
    whyChooseCards: [
      { title: 'Verified Companies', description: 'Partner with verified employers hiring active tech professionals.', icon: 'ShieldCheck' },
      { title: 'Dedicated HR Support', description: 'Our experts guide candidate screening and coordinate interview processes.', icon: 'Users' },
      { title: 'AI Resume Scoring', description: 'Get direct feedback and match scores for your targeted role applications.', icon: 'Cpu' },
      { title: 'Fast & Efficient', description: 'Reduce hiring times by up to 40% with pre-screened shortlists.', icon: 'Zap' },
      { title: 'Professional Screening', description: 'Every candidate undergoes telephone pre-interviews and technical checks.', icon: 'CheckCircle' },
      { title: 'Interview Support', description: 'Get professional coordinate schedules and reviewer assignments.', icon: 'CalendarDays' }
    ],
    sectionOrder: [
      'hero',
      'benefits_candidate',
      'benefits_employer',
      'statistics',
      'how_it_works',
      'testimonials',
      'featured_jobs',
      'partners',
      'placements',
      'faqs',
      'cta'
    ],
    visibleSections: {
      hero: true,
      benefits_candidate: true,
      benefits_employer: true,
      statistics: true,
      how_it_works: true,
      testimonials: true,
      featured_jobs: true,
      partners: true,
      placements: true,
      faqs: true,
      cta: true
    }
  })

  console.log('Database Seeding Completed Successfully!')
  await mongoose.disconnect()
  console.log('Database disconnected!')
}

seed().catch((err) => {
  console.error('Seeding Failed:', err)
  process.exit(1)
})
