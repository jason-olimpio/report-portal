const path = require('path');
const {getDefaultConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

const aliases = [
  ['@components', 'components'],
  ['@assets', 'assets'],
  ['@types', 'types'],
  ['@screens', 'screens'],
  ['@config', 'config'],
  ['@store', 'store'],
  ['@constants', 'constants'],
];

config.resolver.extraNodeModules = Object.fromEntries(
  aliases.map(([alias, dir]) => [alias, path.resolve(__dirname, dir)]),
);

const enhancedConfig = withNativeWind(config, {input: './global.css'});

module.exports = wrapWithReanimatedMetroConfig(enhancedConfig);
