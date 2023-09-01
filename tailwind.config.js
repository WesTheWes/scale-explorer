/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        scarlett: {
          50: "#fdf1ef",
          100: "#ffdcd5",
          200: "#ffc4ba",
          300: "#ffa392",
          400: "#fd7962",
          500: "#ff5b3e",
          600: "#d43c21",
          700: "#7e2311",
          800: "#591709",
        },
        'note-0' : '#eb4034',
        'note-1' : '#eb5c34',
        'note-2' : '#eb6534',
        'note-3' : '#eb8c34',
        'note-4' : '#eb9934',
        'note-5' : '#eba534',
        'note-6' : '#ebb434',
        'note-7' : '#ebc334',
        'note-8' : '#ebd934',
        'note-9' : '#ebeb34',
        'note-10': '#cdeb34',
        'note-11': '#b7eb34',
        'note-12': '#9feb34',
      },
    },
  },
  plugins: [],
}
