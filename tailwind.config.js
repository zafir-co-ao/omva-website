/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/*.{vue,js,ts}',
    './components/*.{vue,js,ts}',
    './layouts/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#11a140',
        primaryDense: '#0c752f',
        secondary: '#052a44',
        white: '#FEFEFE',
        brown: '#2F3538',
        greenLight: '#F1F9FA',
        footColor: '#5e6a71',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        benton: ['Benton Sans', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1440px',
      },
      padding: {
        '1/2': '3px',
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-teste.jpg')",
      },
    },
  },
  plugins: [],
};
