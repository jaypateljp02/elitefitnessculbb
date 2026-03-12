/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'elite-black': '#000000',
                'elite-dark': '#0a0a0a',
                'elite-gray': '#121212',
                'elite-gray-light': '#1a1a2e',
                'elite-purple': '#8B5CF6',
                'elite-purple-dark': '#6D28D9',
                'elite-pink': '#EC4899',
                'elite-pink-glow': '#F472B6',
            },
            fontFamily: {
                'heading': ['Outfit', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'neon-purple': '0 0 20px rgba(139,92,246,0.5), 0 0 60px rgba(139,92,246,0.2)',
                'neon-pink': '0 0 20px rgba(236,72,153,0.5), 0 0 60px rgba(236,72,153,0.2)',
                'neon-purple-lg': '0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(139,92,246,0.3)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out',
                'zoom-in': 'zoomIn 20s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(139,92,246,0.4)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                zoomIn: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.15)' },
                },
            },
        },
    },
    plugins: [],
}
