/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "pronoms/pronoms.html",
    "verbes/verbes.html",
    "./homePage.html",
    "adverbes/adverbes.html",
    "adjectifs/adjectifs.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#242121',
        'custom-bg-box': '#453f3f',
        'custom-bg-vert': "#0fbd09"
      },
    },
  },
  plugins: [],
}

