/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      press: ['"Press Start 2P"', 'monospace'],
      roboto: ['Roboto Mono', 'monospace'],
      vt: ['VT323', 'monospace'],
    },
    extend: {},
  },
  plugins: [require('tailwindcss-animation-delay')],
};
