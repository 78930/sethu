/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        steel: {
          50: '#eef5fb',
          100: '#d8e8f6',
          200: '#b3d0ec',
          300: '#89b5df',
          400: '#5b97ce',
          500: '#397bb5',
          600: '#2b6294',
          700: '#234f77',
          800: '#214364',
          900: '#203955'
        },
        safety: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        }
      }
    }
  },
  plugins: []
};
