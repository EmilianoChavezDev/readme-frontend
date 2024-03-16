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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        colorPrimario: "#167574",
        colorHoverPrimario: "#0b5755",
      },
      
      width: {
        customWidth: '250px', // Ancho personalizado
      },
      height: {
        customHeight: '350px', // Altura personalizada
      },
    },
    
    screens: {
      // small resolutions
      '_sm': '640px',
      '_md': '768px',
      '_lg': '1024px',
      '_xl': '1280px',
      // large resolutions
      'sm': '868px',
      'md': '1124px',
      'lg': '1380px',
      'xl': '1634px',
      '2xl': '1634px',
    }
  },
  plugins: [],
});
