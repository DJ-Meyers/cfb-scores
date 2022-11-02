/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{html,js,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Proxima Nova', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                cardslide: {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(100vw, 0) rotate(75deg)' },
                },
                scoretoast: {
                    '0%': { transform: 'translate(0, 0px)', opacity: 0 },
                    '50%': { opacity: 1 },
                    '100%': { transform: 'translate(0, -30px)', opacity: 0 },
                },
            },
            animation: {
                'score-toast': 'scoretoast ease-in-out 1s 1',
                'card-slide': 'cardslide ease-in-out 1s 1',
            },
        },
    },
    plugins: [],
};
