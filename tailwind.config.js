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
          DEFAULT: '#B19CD9',
          50: '#F4EBFF',
          100: '#E8DFFF',
          200: '#D4C4E9',
          300: '#B19CD9',
          400: '#9F87CC',
          500: '#8A7AA9',
          600: '#766A94',
          700: '#625A7F',
          800: '#4E4969',
          900: '#3A3954',
        },
        navy: {
          DEFAULT: '#10101E',
          50: '#2E2E4C',
          100: '#282844',
          200: '#22223A',
          300: '#1E1E32',
          400: '#1A1A2A',
          500: '#10101E',
          600: '#0C0C16',
          700: '#08080E',
          800: '#040406',
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
          DEFAULT: '#B19CD9',
          light: '#D4C4E9',
          dark: '#8A7AA9',
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
        'subtle': '0 2px 10px rgba(177, 156, 217, 0.05)',
        'card': '0 4px 20px rgba(177, 156, 217, 0.08)',
        'elevated': '0 8px 30px rgba(177, 156, 217, 0.12)',
        'primary': '0 4px 12px rgba(177, 156, 217, 0.25)',
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
        'gradient-primary': 'linear-gradient(to right, #B19CD9, #8A7AA9)',
        'gradient-card': 'linear-gradient(to bottom right, rgba(30, 30, 50, 0.8), rgba(16, 16, 30, 0.8))',
      },
    },
  },
  plugins: [],
} 