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
    },
    mainFields: ["main"]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [["htm", {
              import: "preact"
            }]],
            presets: [["@babel/env", {
              modules: false
            }]]
          }
        }
      },
      {
        test: /htm\/preact/,
        use: "null-loader"
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
  devtool: process.env.NODE_ENV === "production" ? "source-map" : "eval"
};
