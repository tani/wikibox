const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
module.exports = {
  mode: "production",
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
              plugins: ["transform-inline-environment-variables"]
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
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([
      { from: "resource/*.*", to: "[name].[ext]" },
      { from: Path.resolve(`${__dirname}/../README.md`), to: "index.md" }
    ])
  ],
  devtool: "source-map",
  devServer: {
    contentBase: Path.resolve(`${__dirname}/build/${process.env.THEME}/`),
    hot: true,
    inline: true
  }
};
