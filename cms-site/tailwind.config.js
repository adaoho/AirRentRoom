/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          300: '#FB535A'
        },
        adaoho: {
          200: '#B933CF'
        },
        gray: {
          500: '#A4A4B3',
          400: '#F7F7F9'
        }
      }
    }
  },
  plugins: []
}
