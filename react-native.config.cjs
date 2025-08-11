/**
 * react-native.config.cjs
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Configures asset folders for fonts and images, and sets up project configuration
 * for Android and iOS platforms.
 */

module.exports = {
  assets: ['./assets/fonts/', './assets/images/'],
  project: {
    android: {},
    ios: {},
  },
}
