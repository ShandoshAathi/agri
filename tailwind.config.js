/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./frontend/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          dark: "#0b1320",
          card: "#132238",
          emerald: "#10b981",
          teal: "#14b8a6",
          cyan: "#06b6d4"
        }
      }
    },
  },
  plugins: [],
}
