/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shopify: {
          DEFAULT: '#008060',
          dark: '#004C3F',
          light: '#00A862',
          'surface': '#004C3F',
        },
        sidebar: {
          DEFAULT: '#1A1A2E',
          hover: '#242442',
          active: '#2D2D4F',
        },
        page: {
          DEFAULT: '#F6F6F7',
          card: '#FFFFFF',
          border: '#E1E3E5',
        },
        text: {
          primary: '#202223',
          secondary: '#6B7177',
          muted: '#8C9196',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
