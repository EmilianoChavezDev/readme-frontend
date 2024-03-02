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
    },
    screens: {
      'sm': '868px',
      // => @media (min-width: 640px) { ... }

      'md': '1124px',
      // => @media (min-width: 768px) { ... }

      'lg': '1380px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1634px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1634px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
});
