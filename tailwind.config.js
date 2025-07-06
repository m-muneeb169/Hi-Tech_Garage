// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '70vh': '70vh', // for scrollable form sections
      },
      colors: {
        primary: '#2563eb',    // blue-600
        secondary: '#1e40af',  // blue-800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // clean modern font
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      scale: {
        '98': '0.98',
        '102': '1.02',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
 plugins: [require("tailwindcss-animate")],
}


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       // You can add custom colors or fonts here if needed
//     },
//   },
//   plugins: [],
// }
