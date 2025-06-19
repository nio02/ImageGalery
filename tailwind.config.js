/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
    "./src/**/.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F7FAFC',
        secondary: '#1A80E5',
        tertiary: '#4F7396',
        quaternary: '#E5E8EB',
        shadow: '#E8EDF2',
        main: '#0D141C'
      },
      fontFamily: {
        WorkSans: ['Work Sans']
      }
    },
  },
  plugins: [],
}

