/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        '144' : '36rem',
      },
      height:{
        '120' : '30rem',
      },
      height:{
        '160' : '40rem',
      },
      height:{
        '100' : '25rem',
      },
      width:{
        '120' : '30rem',
      },
      width:{
        '110' : '27.5rem',
      },
    },
  },
  plugins: [],
}

