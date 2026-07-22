/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        eps: {
          navy: '#0B2A5B',
          navy2: '#163F7A',
          blue: '#1984F2',
          accent: '#5DA9FF',
          bg: '#FFFFFF',
          surface: '#F8FAFC',
          border: '#DCE7F5',
          text: '#1C1F24',
          text2: '#6B7280',
          success: '#16A34A',
          warning: '#F59E0B',
          danger: '#DC2626',
          whatsapp: '#25D366'
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '10px',
        'input': '10px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 42, 91, 0.05)',
        'float': '0 10px 30px -5px rgba(11, 42, 91, 0.08)',
      }
    },
  },
  plugins: [],
}
