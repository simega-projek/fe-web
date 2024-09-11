const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        light: "#D7CEC7",
        blackboard: "#565656",
        primary: "#76323F",
        tan: "#C09F80",
        secondary: "#64748b",
        dark: "#0f172a",
        gran: "#D7CEC7",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [flowbite.plugin()],
};
