/**
 * babel.config.cjs
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Configures Babel presets and plugins for development.
 */

module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
