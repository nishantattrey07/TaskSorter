/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#448CBB',
        secondary: '#BB7344',
        charcol: '#464655',
        yellow: '#FFD23F',
        lavender:'#EDE3E4'
      }
    },
  },
  plugins: [],
}

