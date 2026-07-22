import { Crown, CheckCircle2, Zap, Shield, CreditCard } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function ManageSubscriptions() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Post up to 2 jobs',
        'Basic company profile',
        'View candidate profiles',
        'Standard support'
      ],
      icon: CheckCircle2,
      color: 'text-white/50'
    },
    {
      name: 'Basic',
      price: '$99',
      period: 'per month',
      features: [
        'Post up to 10 jobs',
        'Enhanced company profile',
        'Direct message candidates',
        'Priority email support',
        'Basic applicant filtering'
      ],
      icon: Zap,
      color: 'text-blue-400'
    },
    {
      name: 'Premium',
      price: '$299',
      period: 'per month',
      features: [
        'Unlimited job postings',
        'Featured company profile',
        'AI Resume Matching',
        'Automated interview scheduling',
        '24/7 dedicated support'
      ],
      icon: Crown,
      color: 'text-[#CCA43B]'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'annual billing',
      features: [
        'Everything in Premium',
        'Custom ATS integrations',
        'Dedicated account manager',
        'Custom reporting & analytics',
        'SLA guarantees'
      ],
      icon: Shield,
      color: 'text-emerald-400'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-[#CCA43B]" />
          Manage Subscriptions
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Configure subscription tiers, limits, and pricing for employer accounts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {plans.map((plan) => (
          <Card key={plan.name} className="p-6 bg-slate-950/40 border-white/10 hover:border-[#CCA43B]/30 transition group flex flex-col relative overflow-hidden">
            {plan.name === 'Premium' && (
              <div className="absolute top-0 right-0 left-0 bg-[#CCA43B]/20 py-1 text-center text-[10px] font-bold text-[#CCA43B] uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className={`mt-${plan.name === 'Premium' ? '4' : '0'}`}>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                <plan.icon className={`w-6 h-6 ${plan.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span className="text-xs text-white/50 font-bold uppercase tracking-wider">{plan.period}</span>
              </div>
            </div>

            <div className="space-y-3 flex-1 mb-8">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="secondary" className="w-full">
              Edit Plan Limits
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-[#0B4C8C]/10 border-[#0B4C8C]/30 text-center mt-8">
        <Crown className="w-8 h-8 text-[#CCA43B] mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Billing Integration Status</h3>
        <p className="text-sm text-white/70 max-w-xl mx-auto mb-6">
          Currently, subscription upgrades are handled manually by EPS Admins. Integration with Stripe/Razorpay is planned for the next major release to allow employers to self-serve upgrades.
        </p>
        <Button variant="primary">
          Configure Payment Gateway (Coming Soon)
        </Button>
      </Card>
    </div>
  )
}
