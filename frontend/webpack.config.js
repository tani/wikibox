const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: "./src/index.tsx"
  },
  output: {
    path: Path.resolve(`${__dirname}/build/${process.env.THEME}`),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
                ["@babel/preset-env", { useBuiltIns: "usage", modules: false }]
              ],
              plugins: [
                "transform-inline-environment-variables",
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(eot|ttf|otf|woff2?|png|gif|jpe?g|svg)$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.resolve(`${__dirname}/src/index.html`)
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([
      {
        from: Path.resolve(`${__dirname}/../data/*.md`),
        to: "data/[name].[ext]"
      },
      { from: Path.resolve(`${__dirname}/../README.md`), to: "data/index.md" }
    ])
  ],
  devtool: process.env.NODE_ENV === "development" ? "source-map" : "none",
  devServer: {
    contentBase: Path.resolve(`${__dirname}/build/${process.env.THEME}/`),
    hot: true,
    inline: true
  }
};
