module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
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
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#39a2db",
          "secondary": "#0077b5",
          "accent": "#1FB2A6",
          "neutral": "#191D24",
          "base-100": "#f3f4f6",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },

      }
    ]
  },
  variants: {
    extend: {}
  }
};
