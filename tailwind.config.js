/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs", "./views/**/*.ejs", "./static/**/*.{js,css}"],
  theme: {
    extend: {},
  },
  plugins: ['prettier-plugin-tailwindcss'],
}

