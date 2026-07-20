import { tokens } from './tokens'

export const theme = {
  colors: {
    primary: tokens.primary,
    secondary: tokens.secondary,
    accent: tokens.accent,
    success: tokens.success,
    warning: tokens.warning,
    danger: tokens.danger,
    bg0: tokens.bg[0],
    bg1: tokens.bg[1],
    bg2: tokens.bg[2],
    text0: tokens.text[0],
    text1: tokens.text[1],
  },

  gradients: {
    hero:
      'radial-gradient(800px circle at 10% 10%, rgba(11,76,140,0.35), transparent 40%), radial-gradient(700px circle at 90% 20%, rgba(204,164,59,0.25), transparent 40%), radial-gradient(500px circle at 50% 90%, rgba(204,164,59,0.15), transparent 45%)',
    border:
      'linear-gradient(135deg, rgba(11,76,140,0.9), rgba(204,164,59,0.85), rgba(204,164,59,0.7))',
    stripe:
      'linear-gradient(90deg, rgba(11,76,140,0.9), rgba(204,164,59,0.9), rgba(204,164,59,0.8))',
  },

  radius: tokens.radius,
  shadow: {
    soft: tokens.shadow.soft,
    glow: '0 0 0 1px rgba(11,76,140,0.35), 0 0 30px rgba(11,76,140,0.22)',
  },
}
