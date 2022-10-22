module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#39a2db',
        secondary: '#0077b5'
      },
      fontFamily: {
        body: ['Montserrat']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
