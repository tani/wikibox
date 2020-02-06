const WorkerPlugin = require("worker-plugin");
module.exports = {
  name: "default",
  mode: process.env.NODE_ENV || "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    publicPath: "lib/",
    filename: "[name].bundle.js"
  },
  resolve: {
    alias: {
      jquery: "jquery/dist/jquery.slim.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/env", {
              targets: {
                esmodules: true
              }
            }]]
          }
        }
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
      globalObject: "self"
    })
  ],
  devtool: "source-map"
};
