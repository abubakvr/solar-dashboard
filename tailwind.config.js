/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pale-blue": "#F3F4FD",
        midnight: "#363993",
        charcoal: "#080817",
        "pastel-blue": "#ADB0EC",
        "deep-blue": "#1F23EB",
        "bright-blue": "#5D61E4",
        indigo: "#292B6B",
        kuka: "#70944D",
      },
    },
  },
  plugins: [],
};
