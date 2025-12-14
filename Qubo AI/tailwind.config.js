/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            colors: {
                glass: "rgba(255, 255, 255, 0.05)",
                glassBorder: "rgba(255, 255, 255, 0.1)",
            }
        },
    },
    plugins: [],
}
