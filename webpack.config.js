const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const PnpWebpackPlugin = require("pnp-webpack-plugin");

module.exports = {
  name: "default",
  mode: process.env.NODE_ENV,
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    filename: "[name].min.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [PnpWebpackPlugin]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "raw-loader"
          }
        ]
      }
    ]
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)]
  },
  plugins: [
    new WorkerPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      reportFiles: ["src/**/*.{ts,tsx}"]
    })
  ],
  devtool: "source-map"
};
