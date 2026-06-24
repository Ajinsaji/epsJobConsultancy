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
      'radial-gradient(800px circle at 10% 10%, rgba(99,102,241,0.35), transparent 40%), radial-gradient(700px circle at 90% 20%, rgba(139,92,246,0.28), transparent 40%), radial-gradient(500px circle at 50% 90%, rgba(6,182,212,0.22), transparent 45%)',
    border:
      'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.85), rgba(6,182,212,0.75))',
    stripe:
      'linear-gradient(90deg, rgba(99,102,241,0.9), rgba(139,92,246,0.9), rgba(6,182,212,0.85))',
  },

  radius: tokens.radius,
  shadow: tokens.shadow,
}

