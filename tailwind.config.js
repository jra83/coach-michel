/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          light: '#4da3ff',
          lighter: '#e6f2ff',
        },
        gray: {
          darkest: '#212529',
          darker: '#495057',
          dark: '#6c757d',
          light: '#adb5bd',
          lighter: '#e9ecef',
          lightest: '#f8f9fa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}