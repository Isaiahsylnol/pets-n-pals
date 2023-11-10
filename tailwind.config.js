/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
