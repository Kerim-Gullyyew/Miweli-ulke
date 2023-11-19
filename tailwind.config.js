/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    screen: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#4E4B9E",
        secondary: "#1E1F20",
        colorRed: "#ed4337",
        primaryBackground: "#EFECF7",
        colorBrown: "#593D3D",
        colorGreen: "#3db39e"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ],
};
