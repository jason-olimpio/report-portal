import type {Config} from 'tailwindcss';
import appColors from './config/colors';

const config: Config = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ...appColors,
      },
    },
  },
  plugins: [],
};

export default config;
