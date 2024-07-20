const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", 
    flowbite.content(), 
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      textShadow: {
        outline: '2px 2px 0 rgba(255, 0, 0, 1)', // Red outline
        
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
        charts: true,
    }),
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-outline': {
          textShadow: '2px 2px 0 rgba(255, 0, 0, 1)', // Adjust color and size as needed
        },
      });
    },
    // ... other plugins
  ]
};
