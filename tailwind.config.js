/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./Components/**/*."],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "silver-chalice": "#BEBEBE",
        "cadmium-orange": "#FA9338",
        "card-head": "#FBA459",
      },
    },
  },
  plugins: [],
};
