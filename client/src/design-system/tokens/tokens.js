// EPS Workforce Solutions Central Enterprise Design Tokens

export const colors = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  secondary: '#3B82F6',
  accent: '#14B8A6',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  sidebar: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E5E7EB',
  divider: '#E2E8F0',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  muted: '#6B7280',
  disabled: '#9CA3AF',
}

export const typography = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  display: 'text-[52px] font-extrabold tracking-tight leading-[1.12]',
  heading: 'text-[36px] font-extrabold tracking-tight leading-tight',
  section: 'text-[28px] font-bold tracking-tight leading-snug',
  title: 'text-[22px] font-bold leading-snug',
  body: 'text-[16px] font-normal leading-relaxed',
  small: 'text-[14px] font-medium leading-relaxed',
  caption: 'text-[12px] font-medium leading-normal',
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }
}

export const spacing = {
  baseUnit: 8, // 8px baseline grid
  container: '1440px',
  pagePadding: '40px',
  sectionGap: '120px',
  cardPadding: '32px',
  buttonHeight: '44px',
  inputHeight: '48px',
  sidebarWidth: '256px',
  sidebarCollapsedWidth: '80px',
}

export const borderRadius = {
  sm: '8px',
  md: '12px',
  card: '16px',
  modal: '24px',
  full: '9999px',
}

export const shadows = {
  subtle: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
  card: '0 4px 12px -2px rgba(0,0,0,0.05), 0 2px 6px -1px rgba(0,0,0,0.03)',
  elevated: '0 12px 24px -4px rgba(37,99,235,0.08), 0 4px 12px -2px rgba(0,0,0,0.04)',
  floating: '0 20px 35px -5px rgba(0,0,0,0.1), 0 8px 15px -3px rgba(0,0,0,0.04)',
}

export const motion = {
  durationFast: '150ms',
  durationNormal: '200ms',
  durationSlow: '250ms',
  ease: 'cubic-bezier(0, 0, 0.2, 1)',
  hoverLift: 'transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg',
  cardFade: 'animate-in fade-in duration-200',
  drawerSlide: 'animate-in slide-in-from-right duration-250',
  modalScale: 'animate-in zoom-in-95 duration-200',
}

export const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  largeDesktop: '1440px',
}
