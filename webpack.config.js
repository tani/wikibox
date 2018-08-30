const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const Path = require('path');
const Filehound = require('filehound');

const themes = Filehound
  .create()
  .path('node_modules/bootswatch/dist')
  .directory()
  .findSync()
  .map(dirname => dirname.replace(/.*\//, ''));

module.exports = themes.map(theme => ({
  name: theme,
  mode: process.env.MODE,
  entry: {
    'bundle': './src/client/index.js',
  },
  output: {
    path: Path.resolve(__dirname, 'docs', theme),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-env'],
        },
      }, {
        loader: 'eslint-loader',
      }],
    }, {
      test: /\.css/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      }],
    }, {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {}
        }
      }, {
        loader: 'eslint-loader',
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      THEME: JSON.stringify(theme),
    }),
    new CopyWebpackPlugin([
      { from: 'src/client/resource/*.*', to: '[name].[ext]' },
      { from: 'src/client/resource/*.*', to: 'standalone/[name].[ext]' },
      { from: 'README.md', to: 'index.md' },
      { from: 'README.md', to: 'standalone/index.md' },
    ]),
  ],
}));
