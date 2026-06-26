import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GlassButton } from '../../../components/ui/GlassButton'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-24 bg-[#050816] text-white relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-violet-600/10 to-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        
        {/* Banner card container */}
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#080E24]/90 via-[#030612]/90 to-[#080E24]/90 p-8 sm:p-12 lg:p-16 text-center space-y-8 shadow-[0_0_80px_rgba(124,58,237,0.15)] relative overflow-hidden">
          
          {/* Subtle decoration lines inside the card */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full border border-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full border border-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Heading */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight">
              Ready to Accelerate Your Recruitment Journey?
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Whether you are a software developer seeking your next high-growth engineering role or an employer aiming to scale your technical team with pre-screened shortlists, EPS Job Consultancy is built for you.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <GlassButton
              as={motion.button}
              variant="primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/register')}
              className="px-8 py-3 text-sm font-extrabold bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#3B82F6] shadow-[0_0_20px_rgba(139,92,246,0.3)] w-full sm:w-auto min-h-[48px]"
            >
              Build Your Career (Candidates)
            </GlassButton>
            <GlassButton
              as={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/register')}
              className="px-8 py-3 text-sm font-extrabold border border-white/10 bg-white/5 hover:bg-white/10 transition w-full sm:w-auto min-h-[48px]"
            >
              Hire Top Talent (Employers)
            </GlassButton>
          </div>

        </div>

      </div>
    </section>
  )
}
