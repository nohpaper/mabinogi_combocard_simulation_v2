/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      //기존 tailwind css 유지하고 새로 추가
      keyframes: {
        blink: {
          '0%': { opacity:0 },
          '100%': { opacity:1 },
        }
      },
      /*textShadow: {
        red: "0 0 4px #cf290f, 0 0 4px #cf290f, 0 0 4px #cf290f, 0 0 4px #cf290f"
      },*/
      animation: {
        blink: "blink .8s ease infinite alternate",
      }
    },
    fontFamily: {
      Mabinogi: ["Mabinogi"],
    },
  },
  plugins: [],
}

