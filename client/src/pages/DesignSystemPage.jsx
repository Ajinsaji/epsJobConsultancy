import React from 'react'
import { Layers, ShieldCheck, Smartphone, Monitor } from 'lucide-react'
import { 
  ColorShowcase, TypographyShowcase, ButtonShowcase, CardShowcase, 
  FormShowcase, TokensShowcase 
} from '../design-system'
import { DesignMetricsPanel, ComponentStatsPanel } from '../presentation/Modules/DesignMetricsPanel'
import { MotionShowcase } from '../presentation/Modules/MotionShowcase'

export const DesignSystemPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans p-6 md:p-12 space-y-12">
      
      {/* Top Header */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center">
            EPS
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Design System & Component Library</h1>
            <p className="text-sm text-gray-600">Documentation of design tokens, spatial grid, typography, and atomic primitives.</p>
          </div>
        </div>
      </div>

      <TokensShowcase />
      <ColorShowcase />
      <TypographyShowcase />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ButtonShowcase />
        <FormShowcase />
      </div>

      <CardShowcase />
      <MotionShowcase />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DesignMetricsPanel />
        <ComponentStatsPanel />
      </div>

    </div>
  )
}
