/* eslint-env node */
const CommonConfigWebpackPlugin = require('common-config-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const {name, main} = require('./package.json');

module.exports = {
  mode: 'production',
  entry: main,
  output: {
    library: name,
    libraryTarget: 'umd',
    filename: `${name}.min.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({title: name}),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: '@babylonjs/core',
          entry: 'https://cdn.babylonjs.com/babylon.js',
          global: 'BABYLON',
        },
      ],
    }),
    new CommonConfigWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(webp)$/i,
        use: ['file-loader', 'img-loader'],
      },
    ],
  },
};
