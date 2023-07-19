/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
      tilt: ["Tilt Prism", "cursive"],
      abril: ["Abril Fatface", "cursive"],
      aladin: ["Aladin", "cursive"],
      cookie: ["Cookie", "cursive"],
      gloria: ["Gloria Hallelujah", "cursive"],
      lolita: ["Lilita One", "cursive"],
      lobster: ["Lobster", "cursive"],
      mark: ["Marck Script", "cursive"],
      pacifico: ["Pacifico", "cursive"],
      marker: ["Permanent Marker", "cursive"],
      sacramento: ["Sacramento", "cursive"],
      satisfy: ["Satisfy", "cursive"],
      sofia: ["Sofia", "cursive"],
      special: ["Special Elite", "cursive"],
      baby: ["Babylonica", "cursive"],
      glock: ["Gloock", "serif"],
      right: ["Righteous", "cursive"],
      neon: ["Tilt Neon", "cursive"],
    },
    extend: {
      colors: {
        black: "#000",
        "dark-purple0000": "#470A77",
        "dark-purple000": "#35007a",
        "dark-purple00": "#3a0ca3",
        "dark-purple0": "#16003B",
        "dark-purple1": "#2D00F7",
        "dark-purple2": "#6A00F4",
        "dark-purple3": "#8900F2",
        "dark-purple4": "#A100F2",
        "dark-purple5": "#B100E8",
        "dark-pink1": "#BC00DD",
        "dark-pink2": "#D100D1",
        "dark-pink3": "#DB00B6",
        "dark-pink4": "#E500A4",
        "dark-pink5": "#F20089",
        "dark-pink6": "#F94892",
        "dark-pink7": "#ddbdfc",
        "dark-pink8": "#cb429f",
        "dark-pink9": "#f679e5",
        "dark-pink10": "#c19bff",
        "dark-pink11": "#ff65b3",
        "button-color": "#8471db",
        "navbar-color": "#240461",
      },
      transitionDelay: {
        0: "1000ms",
        3000: "3000ms",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "gradient-x": "gradient-x 20s ease-in-out infinite",
        "gradient-y": "gradient-y 3s ease infinite",
        "gradient-xy": "gradient-xy 3s ease infinite",
        "linear-x": "linear-x 2s ease infinite",
        shapes: "shapes 7s infinite",
        "spin-slow": "spin 15s  linear infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "linear-x": {
          "0%": { transform: "-translate-x-96" },
          "100%": { transform: "translate-x-0" },
        },
        transitionTimingFunction: {
          in: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
          out: "cubic-bezier(0.19, 1, 0.22, 1)",
        },
        shapes: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
