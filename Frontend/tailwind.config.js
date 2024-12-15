/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",//means tailwind will work in index.html and 
    "./src/**/*.{js,ts,jsx,tsx}",//it will also woekn in src ke ander js,jsx,tsx all files. 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

