/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{html,js,css}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
