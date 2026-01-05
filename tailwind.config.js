import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", ...defaultTheme.fontFamily.sans],
        sans: ["'Sora'", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        soft: "0 25px 65px -30px rgba(93, 64, 55, 0.25)",
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle at 1px 1px, rgba(93, 64, 55, 0.12) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

