/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "white",
        secondary: "black",
        one:"gray-400",
        two:"gray-900",
      },
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        primary: "black",
        secondary: "white",
        one:"gray-900",
        two:"gray-400",
      },
    }],
  },
}
