/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      desktop: "900px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        colorBlue: "#109CF1",
        colorYellow: "#FFB946",
        colorRed: "#EF9F9F",
        colorGreen: "#C7F2A4",
        colorBrown: "#593D3D",
        colorPurple: "#885AF8",
        colorTable: "#EBEFF2",
        colorDarkRed: "#F47C7C",
        colorLightRed: "#FAD4D4",
        colorDarkGreen: "#B6E388",
        colorLightGreen: "#E1FFB1",
        colorBgContainer: "#E1D7C6",
        colorBackground: "#F5F6F8",
        colorTableRed: "#FFB4B4",
        colorTableLightRed: "#FFDCDC",
        colorTableYellow: "#F9F7D9",
        colorTableBlack: "#323C47",
        colorTableGray: "#707683",
        colorTextDarkBlue: "#334D6E",
        colorTextGray: "#90A0B7",
        colorIconGray: "#FAFAFA",
        colorBorder: "#EBEFF2",
        colorSecondaryBorder: "#C8E4FE",
        colordimWhite: "rgba(255, 255, 255, 0.7)",
        colordimBlue: "rgba(9, 151, 124, 0.1)",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    [require("tw-elements/dist/plugin.cjs")],
  ],
};
