/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6EF",
        ink: "#211D17",
        ochre: "#B9852B",
        ochreDark: "#8F6620",
        teal: "#1F5F52",
        tealDark: "#153F37",
        line: "#E2D8C3",
        muted: "#8A8172",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
