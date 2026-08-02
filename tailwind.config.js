/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0908',
        brown: {
          DEFAULT: '#241C15',
          light: '#2E251C',
          deep: '#1A140F',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E8D9A8',
          deep: '#9C7E1C',
        },
        parchment: '#F4ECD8',
        text: {
          DEFAULT: '#EAE3D2',
          muted: '#A89F8C',
          dim: '#7A7264',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"EB Garamond"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      letterSpacing: {
        'widest-2': '0.3em',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'flicker': 'flicker 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
