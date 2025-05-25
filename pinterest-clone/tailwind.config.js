/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pinterest: {
          red: '#e60023',
          light: '#ffefef',
          dark: '#bd081c',
        },
        grayish: '#f0f0f0',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        pin: '0 4px 12px rgba(0, 0, 0, 0.1)',
        pinHover: '0 6px 20px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        '22': '5.5rem',
        '26': '6.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
