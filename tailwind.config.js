/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ["Tajawal", " sans-serif"],
      },
      colors: {
        colorGreyText: "#454546",
        colorBrand: "#E54F35",
        colorWhite: "#FFFF",
        colorBrandHover: "#c42f1b",
        colorError: "#F44336",
        colorGreyLight: "#E8E7E8",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
