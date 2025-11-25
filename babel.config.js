module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@screens': './src/screens',
            '@components': './src/components',
            '@context': './src/context',
            '@hooks': './src/hooks',
            '@types': './src/types',
            '@lib': './src/lib',
            '@utils': './src/utils',
            '@theme': './src/theme',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
