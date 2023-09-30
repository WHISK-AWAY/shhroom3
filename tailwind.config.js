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
        short: { raw: '(max-height: 768px) and (min-width: 1440px)' },
        large: { raw: '(max-height: 1080px)'},
        tall: {raw: '(max-height: 1440px)'},
        xxs: '360px',
        xs: '375px',
        sm: '412px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
        '4xl': '1920px',
        '5xl': '2560px',
        '6xl': '3440px',
        '7xl': '3840px',
      },
    },
  },
  plugins: [require('tailwindcss-animation-delay')],
};
