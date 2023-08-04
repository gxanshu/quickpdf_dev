/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        qblack: '#010203',
        qblue: '#4169e1'
      }
    }
  },
  plugins: []
};
