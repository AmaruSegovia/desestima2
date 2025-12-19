/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'], // Fuente pixelada
        serif: ['"Merriweather"', 'serif'],      // Fuente seria para el juego
      },
    },
  },
  plugins: [],
}