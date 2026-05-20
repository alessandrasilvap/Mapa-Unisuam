const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for react-native-maps on web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Add web-specific resolver for react-native-maps
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
