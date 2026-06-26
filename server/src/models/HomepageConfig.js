import mongoose from 'mongoose'

const HomepageConfigSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, default: 'homepage' },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    version: { type: Number, default: 1 },
    publishedBy: { type: String },
    publishedAt: { type: Date },
    draftLastUpdatedAt: { type: Date },
    heroBadge: { type: String, default: 'Trusted Recruitment Partner' },
    heroHeadline: { type: String, default: 'Find Jobs. Hire Talent. Grow Faster.' },
    heroSubheading: { type: String, default: 'EPS Job Consultancy is a hybrid recruitment platform that bridges the gap between top-tier talent and leading companies.' },
    primaryCtaText: { type: String, default: 'Find Jobs (Register)' },
    secondaryCtaText: { type: String, default: 'Hire Talent' },

    // Footer config
    footerContactEmail: { type: String, default: 'support@eps.jobs' },
    footerContactPhone: { type: String, default: '+91 9876543210' },
    footerContactAddress: { type: String, default: 'Kerala, India' },
    footerCopyright: { type: String, default: '© 2026 EPS Job Consultancy' },
    footerNewsletterText: { type: String, default: 'Subscribe to get monthly hiring trends and career strategies.' },
    footerSocialLinks: {
      type: Map,
      of: String,
      default: {
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      }
    },

    // SEO config
    seoTitle: { type: String, default: 'EPS Job Consultancy - Smart Tech Recruitment' },
    seoDescription: { type: String, default: 'A hybrid recruitment platform that bridges the gap between top tech talent and high-growth companies.' },
    seoOgTitle: { type: String, default: 'EPS Job Consultancy' },
    seoOgDescription: { type: String, default: 'SaaS recruitment platform and HR screening partner.' },
    seoFavicon: { type: String, default: '/favicon.ico' },
    seoSocialImage: { type: String, default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200' },
    
    whyChooseCards: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: 'CheckCircle' }
      }
    ],
    
    sectionOrder: {
      type: [String],
      default: [
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
      ]
    },
    
    visibleSections: {
      type: Map,
      of: Boolean,
      default: {
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
    }
  },
  { timestamps: true }
)

export const HomepageConfig = mongoose.model('HomepageConfig', HomepageConfigSchema)
