const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Improve web platform support
const originalAssetExts = config.resolver.assetExts || [];
const originalSourceExts = config.resolver.sourceExts || [];

config.resolver = {
  ...config.resolver,
  assetExts: originalAssetExts.filter(ext => ext !== 'json'),
  sourceExts: [...originalSourceExts, 'mjs'],
};

module.exports = withNativeWind(config, { input: './global.css' });
