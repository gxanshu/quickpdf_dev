/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        qblack: '#010203',
        qblue: '#4169e1'
      },
      width: {
        sizes: {
          xs: '540rem',
          sm: '720rem',
          md: '960rem',
          lg: '1140rem',
          xl: '1320rem'
        }
      }
    }
  },
  plugins: []
};
