/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jet: { DEFAULT: '#0A0A0A', light: '#1A1A1A', lighter: '#2A2A2A' },
        gold: { DEFAULT: '#C9A84C', light: '#D4B85E', dark: '#B8973A' },
      },
    },
  },
  plugins: [],
}
