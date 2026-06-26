import React from 'react'

export function SkeletonCard() {
  return (
    <div className="h-64 rounded-2xl border border-white/5 bg-white/5 p-6 animate-pulse flex flex-col justify-between">
      <div>
        <div className="h-8 w-8 rounded-lg bg-white/10 mb-3" />
        <div className="h-5 w-32 rounded bg-white/10 mb-2" />
        <div className="h-3 w-48 rounded bg-white/10" />
      </div>
      <div className="h-10 w-full rounded bg-white/10 mt-4" />
    </div>
  )
}

export function SkeletonForm() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 w-32 rounded bg-white/10" />
      <div className="h-10 w-full rounded bg-white/10" />
      <div className="h-4 w-24 rounded bg-white/10" />
      <div className="h-20 w-full rounded bg-white/10" />
    </div>
  )
}

// Back-compat export expected by new modular CMS Settings components
export function CMSSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonCard />
      <SkeletonForm />
    </div>
  )
}

