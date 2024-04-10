import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
        '50': '#fdf6f3',
        '100': '#fceae4',
        '200': '#fad9ce',
        '300': '#f6beab',
        '400': '#ec8c6b',
        '500': '#e27651',
        '600': '#cf5b33',
        '700': '#ad4a28',
        '800': '#904024',
        '900': '#783924',
        '950': '#411b0e',
        },
        'secondary': {
            '50': '#f5f6f6',
            '100': '#e4e6e9',
            '200': '#cdd2d4',
            '300': '#aab1b6',
            '400': '#7f8991',
            '500': '#5e676f',
            '600': '#565d64',
            '700': '#494e55',
            '800': '#414449',
            '900': '#393c40',
            '950': '#232529',
        },
        'tertiary': {
            '50': '#f6f7f8',
            '100': '#ebecee',
            '200': '#dcdee1',
            '300': '#c9cdd0',
            '400': '#a7adb3',
            '500': '#92989f',
            '600': '#81868f',
            '700': '#747881',
            '800': '#61656c',
            '900': '#505358',
            '950': '#333438',
        },
      }

    },
  },
  plugins: [],
};
export default config;
