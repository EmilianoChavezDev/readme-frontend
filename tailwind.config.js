/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem", // 10px,
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        colorPrimario: "#167574",
        colorHoverPrimario: "#0b5755",
        ChaptearHeader: "#7EAFAF",
        BooksCreateSeguirButton: "#167574",
        BooksCreateCancelarButton: "#738d90",
        BooksCreateImageBackground: "#eeeeee",
        lineColorBorder: "#C7C7C7",
        buttonColorGray: "#E9ECEF",
        textColorGray: "#717171",
        textHeaderColorGray: "#484848",
        textInformationColor: "#222222",
        colorBorderGray: "#89979B",
      },

      width: {
        customWidth: "233px", // Ancho personalizado
      },
      height: {
        customHeight: "333px", // Altura personalizada
      },
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      60: 60,
      70: 70,
      80: 80,
      90: 90,
      100: 100,
    },
    screens: {
      // small resolutions
      _sm: "640px",
      _md: "768px",
      _lg: "1024px",
      _xl: "1280px",
      // large resolutions
      sm: "868px",
      md: "1124px",
      lg: "1380px",
      xl: "1634px",
      "2xl": "1634px",
    },
  },
  plugins: [],
});
