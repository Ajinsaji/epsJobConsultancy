/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B4C8C', // Deep Professional Blue
          dark: '#07335e',
          light: '#1F7BE5',
        },
        accent: {
          DEFAULT: '#CCA43B', // Logo Gold
          light: '#E5C56E',
          dark: '#9F7C24',
        },
      },
    },
  },
  plugins: [],
}
