module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "475px",
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
