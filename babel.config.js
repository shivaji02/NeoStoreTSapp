module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-class-properties', { "loose": true }],
    ['@babel/plugin-transform-private-methods', { "loose": true }],
    ['@babel/plugin-transform-private-property-in-object', { "loose": true }],
  ],
};
