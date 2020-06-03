module.exports = {
  name: "default",
  mode: process.env.NODE_ENV || "development",
  entry: {
    index: "./src/index.js",
  },
  output: {
    publicPath: "lib/",
    filename: "[name].bundle.js",
  },
  resolve: {
    alias: {
      jquery: "jquery/dist/jquery.slim.js",
    },
    mainFields: ["main"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
    ],
  },
  devtool: "source-map",
};
