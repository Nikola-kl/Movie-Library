/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./dist/*.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      sunflower: {
        50: "hsl(60, 75%, 95%)",
        100: "hsl(61, 77%, 88%)",
        200: "hsl(59, 76%, 77%)",
        300: "hsl(57, 76%, 64%)",
        400: "hsl(54, 75%, 53%)",
        500: "hsl(51, 73%, 47%)",
        600: "hsl(47, 75%, 40%)",
        700: "hsl(42, 71%, 33%)",
        800: "hsl(37, 63%, 29%)",
        900: "hsl(35, 57%, 26%)",
        950: "hsl(33, 64%, 14%)",
      },

      mirage: {
        50: "#f2f5fb",
        100: "#e7edf8",
        200: "#d3dcf2",
        300: "#b8c7e9",
        400: "#9ba9de",
        500: "#828dd2",
        600: "#696ec2",
        700: "#585baa",
        800: "#494c8a",
        900: "#40436f",
        950: "#1c1d30",
      },

      black: {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#3d3d3d",
        950: "#000000",
      },
    },

    extend: {
      fontFamily: {
        header: ["Monoton", "cursive", '"DM Sans"', "sans-serif"],
      },
      fontSize: {
        sm: ["14px", "16px"],
        base: ["16px", "18px"],
        lg: ["20px", "23px"],
        xl: ["24px", "30px"],
        "2xl": ["24px", "32px"],
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        "mobile-movies": "repeat(2, 1fr)",
        "tablet-devices": "repeat(4, 1fr)",
        "large-devices": "repeat(auto-fill, minmax(250px, 1fr))",
      },
      screens: {
        "mobile-l": "425px",
        "laptop-s": "600px",
      },
    },
  },
  plugins: [],
};
