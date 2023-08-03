/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      press: ['"Press Start 2P"', 'monospace'],
      roboto: ['Roboto Mono', 'monospace'],
      vt: ['VT323', 'monospace'],
    },
    extend: {
      screens: {
        xs: '375px',
        '2xl': '1440px',
        '3xl': '1536px',
        '4xl': '1920px',
        '5xl': '2560px',
        '6xl': '3440px',
      },
    },
  },
  plugins: [require('tailwindcss-animation-delay')],
};
