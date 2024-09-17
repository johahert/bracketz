/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",  // Include all files in app/ folder
    "./components/**/*.{js,jsx,ts,tsx}" // If you have a components folder
  ],  
  theme: {
    extend: {},
  },
  plugins: [],
}

