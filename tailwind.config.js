/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: "#E8A020",
          "amber-light": "#F0B030",
          dark: "#111111",
          deep: "#0A0A0A",
          panel: "#0D0D0D",
          mid: "#1a1a1a",
        },
      },
      fontFamily: {
        barlow: ["Barlow Condensed", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
