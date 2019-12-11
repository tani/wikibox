const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
module.exports = {
  name: "default",
  mode: process.env.NODE_ENV,
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    path: `${__dirname}/build/default/`,
    filename: "lib/[name].min.js"
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
            loader: "babel-loader"
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
  plugins: [
    new WorkerPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      reportFiles: ["src/**/*.{ts,tsx}"]
    })
  ],
  devtool: "source-map"
};
