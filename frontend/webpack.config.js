const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    "index": "./src/index.tsx"
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
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
                ["@babel/preset-env", { useBuiltIns: "usage", modules: false }]
              ],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: `${__dirname}/src/index.html`,
        to: "index.html"
      },
      {
        from: `${__dirname}/node_modules/highlight.js/styles/atom-one-light.css`,
        to: "lib/highlight.min.css"
      },
      {
        from: `${__dirname}/node_modules/bootstrap/dist/css/bootstrap.min.css`,
        to: "lib/bootstrap.min.css",
      },
      {
        from: `${__dirname}/node_modules/katex/dist/**/*.min.css*`,
        to: "lib/[1]",
        test: /dist\/(.*)/,
        ignore: ["**/contrib/**/*"]
      },
      {
        from: `${__dirname}/node_modules/katex/dist/**/*`,
        to: "lib/[1]",
        test: /dist\/(.*)/,
        ignore: ["*.js", "*.mjs", "*.css", "*.md"]
      },
      {
        from: `${__dirname}/../data/**/*`,
        to: "data/[1]",
        test: /data\/(.*)/
      },
      { from: `${__dirname}/../README.md`, to: "data/index.md" }
    ])
  ],
  devtool: process.env.NODE_ENV === "production" ? "none" : "source-map",
  devServer: {
    contentBase: `${__dirname}/build/`,
    hot: true,
    inline: true
  }
};
