/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'text-navy',
    'text-navy-700',
    'text-navy-900',
    'px-4',
    'px-5',
    'py-2',
    'py-2.5',
    'py-3',
    'rounded-lg',
    'rounded-full',
    'font-medium',
    'bg-primary',
    'hover:bg-primary/90',
    'border',
    'border-gray-600',
    'text-white',
    'hover:bg-gray-800',
    'transition-all',
    'duration-200',
    'duration-300'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF0000',
          50: '#FFEBEB',
          100: '#FFD6D6',
          200: '#FFADAD',
          300: '#FF8585',
          400: '#FF5C5C',
          500: '#FF0000',
          600: '#E60000',
          700: '#B30000',
          800: '#800000',
          900: '#4D0000',
        },
        navy: {
          DEFAULT: '#000000',
          50: '#8A8A8A',
          100: '#797979',
          200: '#5D5D5D',
          300: '#424242',
          400: '#2A2A2A',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        teal: {
          DEFAULT: '#36B5A5',
          light: '#5FCFC1',
          dark: '#2A8C80',
        },
        red: {
          DEFAULT: '#FF4D4D',
          light: '#FF7A7A',
          dark: '#E63939',
        },
        purple: {
          DEFAULT: '#8A6DFF',
          light: '#A694FF',
          dark: '#6F4FE6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'primary': '0 4px 12px rgba(255, 0, 0, 0.25)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        pulse: 'pulse 2s infinite ease-in-out',
        shimmer: 'shimmer 2s infinite linear',
        slideRight: 'slideRight 20s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #FF0000, #CC0000)',
        'gradient-card': 'linear-gradient(to bottom right, rgba(42, 42, 42, 0.8), rgba(0, 0, 0, 0.8))',
      },
    },
  },
  plugins: [],
} 