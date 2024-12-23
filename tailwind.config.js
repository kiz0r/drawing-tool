import { APPLICATION_COLORS } from './src/constants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        activeComponent: APPLICATION_COLORS.activeComponent, // '#c0c0c1'
        secondaryComponent: APPLICATION_COLORS.secondaryComponent, // '#f3f4f6'
        primaryComponent: APPLICATION_COLORS.primaryComponent, //'#e6eaf0',
        tertiaryComponent: APPLICATION_COLORS.tertiaryComponent, //'#e5e7eb',
        hoverTertiary: APPLICATION_COLORS.hoverTertiary, // '#dbdde1',
      },
    },
  },
  plugins: [
    // @ts-ignore
    function ({ addUtilities }) {
      const newUtils = {
        '.widget': {
          gap: '1rem',
          height: 'fit-content',
          display: 'flex',
          'flex-direction': 'column',
          'max-width': '300px',
          padding: '6px',
          'border-radius': '0.375rem',
          'background-color': APPLICATION_COLORS.secondaryComponent,
          'text-align': 'center',
        },

        // bg-secondaryComponent h-fit flex flex-col gap-4 max-w-[300px] p-3 rounded-md
        '.inner-widget': {
          gap: '0.5rem',
          display: 'flex',
          'flex-wrap': 'wrap',
          'align-items': 'center',
          'justify-content': 'space-between',
          'border-radius': '0.375rem',
          padding: '0.5rem',
          'background-color': APPLICATION_COLORS.primaryComponent,
        },
      };
      addUtilities(newUtils, ['responsive', 'hover']);
    },
  ],
};
