/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#222831',
        'secondary-dark': '#31363F',
        'primary-accent': '#76ABAE',
        'primary-light': '#EEEEEE'
      }
    },
  },
  plugins: [],
}