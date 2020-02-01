const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WorkerPlugin = require("worker-plugin");

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
    alias:  {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
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
  plugins: [
    new WorkerPlugin({
      globalObject: 'self'
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      reportFiles: ["src/**/*.{ts,tsx}"]
    })
  ],
  devtool: "source-map"
};
