const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const Path = require('path');

module.exports = (env, argv) => ({
  name: argv.theme,
  mode: argv.mode,
  entry: {
    'bundle': './src/frontend/index.ts',
  },
  output: {
    path: Path.resolve(__dirname, 'docs', argv.theme),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      }],
    }, {
      test: /\.s?css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
      }, {
        loader: 'sass-loader',
      }],
    }, {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {}
        }
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      THEME: JSON.stringify(argv.theme),
    }),
    new CopyWebpackPlugin([
      { from: 'src/frontend/resource/*.*', to: '[name].[ext]' },
      { from: 'README.md', to: 'index.md' },
    ]),
  ],
});
