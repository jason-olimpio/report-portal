import type {Config} from 'tailwindcss'
import appColors from './config/colors'

const config: Config = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media',
  presets: [require('nativewind/preset')],
  theme: {
    fontFamily: {
      sans: ['TitilliumWeb-Regular'],
      'titillium-light': ['TitilliumWeb-Light'],
      'titillium-regular': ['TitilliumWeb-Regular'],
      'titillium-bold': ['TitilliumWeb-Bold'],
      'titillium-semibold': ['TitilliumWeb-SemiBold'],
      'titillium-extralight': ['TitilliumWeb-ExtraLight'],
      'titillium-black': ['TitilliumWeb-Black'],
      'titillium-italic': ['TitilliumWeb-Italic'],
    },
    extend: {
      colors: {
        ...appColors,
      },
    },
  },
  plugins: [],
}

export default config
