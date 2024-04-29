/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

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
        //Dark mode colors
        dark: {
          darkColorNavBar: "#23252B",
          darkColorItems: "#030712",
          darkColorButtons: "#6d28d9",
          darkColorHover: "#6225C5",
          darkColorDisabled: "#381776",
          darkColorNeutral: "#31363F",
          darkColorBackground: "#212730",
        },

        colorPrimario: "#167574",
        colorHoverPrimario: "#0b5755",
        ChaptearHeader: "#7EAFAF",
        BooksCreateCancelarButton: "#738d90",
        BooksCreateImageBackground: "#eeeeee",
        lineColorBorder: "#C7C7C7",
        buttonColorGray: "#E9ECEF",
        textColorGray: "#717171",
        textHeaderColorGray: "#484848",
        textInformationColor: "#222222",
        colorBorderGray: "#89979B",
        colorFondo: "#e9ecef",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
  plugins: [require("tailwindcss-animate")],
});
