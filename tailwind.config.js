/** @type {import('tailwindcss').Config} */
const pxToRem = (px, base = 16) => `${px / base}rem`;

module.exports = {
  content: ["./src/**/*.{html,js}"],
  presets: [require("tailwindcss-preset-px-to-rem")],
  theme: {
    extend: {
      //기존 tailwind css 유지하고 새로 추가
      width: {
        "150pxr": pxToRem(150),
        "351pxr": pxToRem(351),
        "400pxr": pxToRem(400),
        "404pxr": pxToRem(404),
        "500pxr": pxToRem(500),
      },
      height:{
        "468pxr": pxToRem(468),
        "548pxr": pxToRem(548),
        "600pxr": pxToRem(600),
      },
      inset:{
        "106pxr": pxToRem(106),
      },
      padding:{
        "140pxr": pxToRem(140),
      },
      fontSize: {
        "12pxr": pxToRem(12), //`${12 / 16}rem`,
        "13pxr": pxToRem(13),
        "14pxr": pxToRem(14), //"0.875rem",
        "16pxr": pxToRem(16),
        "20pxr": pxToRem(20),
        "32pxr": pxToRem(32),
      },
      lineHeight: {
        "40pxr": pxToRem(40),
        "53pxr": pxToRem(53), //"3.3125rem",
        "58pxr": pxToRem(58), //"3.625rem",
      },
      borderRadius: {
        "3pxr": pxToRem(3),
        "5pxr": pxToRem(5),
        "20pxr": pxToRem(20),
      },
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
      },
    },
    fontFamily: {
      Mabinogi: ["Mabinogi"],
    },
    screens: {
      'tablet': {max: '768px'},
      // => @media (max-width: 640px) { ... }
      
      'laptop': {max: '1024px'},
      // => @media (max-width: 1024px) { ... }
    },
    spacing: Array.from({ length: 100 }, (_, i) => i + 1).reduce((acc, px) => {
      acc[`${px}pxr`] = pxToRem(px);
      return acc;
    }, {}),
  },
  plugins: [],
}

