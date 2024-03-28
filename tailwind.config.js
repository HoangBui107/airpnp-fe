/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#F5385D',
      },
      screens:{
        'phone': '320px'
      }
    },
  },
  plugins: [],
}

