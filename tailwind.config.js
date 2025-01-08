/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Segoeui: ["Segoeui", "sans-serif"],
        SegoeuiLight: ["SegoeuiLight", "sans-serif"],
        SegoeuiBold: ["SegoeuiBold", "sans-serif"],
        SegoeuiBlack: ["SegoeuiBlack", "sans-serif"],
      },
    },
  },
  plugins: [],
};
