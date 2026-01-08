/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        cocoa: '#07332c', // Deep Green (Primary Text/Dark BG)
        cream: '#ededed', // Off-white (Main Background)
        peach: '#afb7ac', // Sage Green (Secondary BG/Accents)
        caramel: '#bca879', // Gold (Buttons/CTA)
        blush: '#485b46', // Medium Green (Highlights)
        // Semantic aliases
        primary: '#07332c', // Deep Green
        secondary: '#bca879', // Gold
        accent: '#485b46', // Medium Green
        background: '#ededed', // Off-white
        surface: '#FFFFFF',
        // Raw Palette
        'luxury-dark': '#07332c',
        'luxury-green': '#485b46',
        'luxury-sage': '#afb7ac',
        'luxury-gold': '#bca879',
        'luxury-light': '#ededed',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-lato)', 'sans-serif']
      }
    }
  },
  plugins: []
}
