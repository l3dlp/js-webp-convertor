/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './*.js',
  ],
  theme: {
    extend: {
      colors: {
        'apple-gray': '#f5f5f7',
        'apple-dark': '#1d1d1f',
        'apple-blue': '#0071e3',
        'apple-blue-dark': '#0077ed'
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'sans': ['Raleway', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif']
      },
    }
  },
  plugins: [],
}