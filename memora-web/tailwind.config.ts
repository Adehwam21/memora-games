import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
      },
      height: {
        '100': "31rem",
        '102': "32rem",
        '105': "33.5rem",
        '110': "43rem",
        '115': "45rem",
        '120': "50rem",
        '130': "60rem",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
        scode: ['Source Code Pro', 'monospace'],
      },
      animation: {
        borderGlow: "borderGlow 2s linear infinite", // Animation name
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(99, 102, 241, 1)" }, // Indigo color
          "50%": { borderColor: "rgba(59, 130, 246, 1)" }, // Blue color
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      }
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require('daisyui')]
};

export default config;