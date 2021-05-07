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
    mainFields: ["browser", "main"]
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
