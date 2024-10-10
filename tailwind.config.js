/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      translate:{
        "half": "-50%",
      }
    },
    fontFamily: {
      Mabinogi: ["Mabinogi"],
    },
  },
  plugins: [],
}

