/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c1016", // page background
        panel: "#131922", // cards
        raised: "#1a222d", // hover / raised surfaces
        line: "#263142", // borders
        fg: "#e8ecf2", // main text
        muted: "#9aa6b8", // secondary text
        accent: "#5fd3c4", // lake teal
        gold: "#f0c36a", // used sparingly: "present" markers
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        orbit: { to: { transform: "rotate(360deg)" } },
        counter: { to: { transform: "rotate(-360deg)" } },
      },
      animation: {
        orbit: "orbit 48s linear infinite",
        counter: "counter 48s linear infinite",
      },
    },
  },
  plugins: [],
};
