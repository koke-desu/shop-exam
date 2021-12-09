module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        header: "#4A244B",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
