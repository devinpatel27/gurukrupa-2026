/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: false,
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e6f0f8',
                    100: '#bfd6ed',
                    200: '#95bae1',
                    300: '#6b9dd5',
                    400: '#4a87cc',
                    500: '#035797',
                    600: '#024e89',
                    700: '#024278',
                    800: '#013667',
                    900: '#0D3B50',
                    DEFAULT: '#035797',
                },
                brand: {
                    blue: '#035797',
                    dark: '#0D3B50',
                    light: '#e6f0f8',
                    orange: '#f97316',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                card: '0 2px 12px rgba(0,0,0,0.07)',
                'card-hover': '0 8px 28px rgba(3,87,151,0.15)',
            },
            keyframes: {
                slideDown: {
                    '0%': { maxHeight: '0', opacity: '0' },
                    '100%': { maxHeight: '400px', opacity: '1' },
                },
                slideUp: {
                    '0%': { maxHeight: '400px', opacity: '1' },
                    '100%': { maxHeight: '0', opacity: '0' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                slideDown: 'slideDown 0.25s ease-out forwards',
                slideUp: 'slideUp 0.2s ease-in forwards',
                fadeInUp: 'fadeInUp 0.5s ease-out forwards',
            },
        },
    },
    plugins: [],
}
