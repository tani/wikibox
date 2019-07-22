const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const themes = "cerulean litera materia sandstone cosmo flatly lumen minty simplex united journal lux pulse sketchy spacelab darkly slate superhero solar cyborg yeti".split(" ");
const dev = (then, otherwise = []) =>
  process.env.NODE_ENV === "development" ? then : otherwise;
const createConfig = THEME => {
  return {
    name: THEME,
    mode: process.env.NODE_ENV,
    entry: {
      index: "./src/index.tsx"
    },
    output: {
      path: `${__dirname}/build/${THEME}/`,
      filename: "index.min.js"
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
            },
            ...dev([
              {
                loader: "eslint-loader"
              }
            ]),
            {
              loader: "string-replace-loader",
              options: {
                multiple: [
                  { search: "%THEME%", replace: THEME },
                ]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                url(url) {
                  return !url.match(/\.woff2$/);
                }
              }
            }
          ]
        },
        {
          test: /\.woff2$/,
          use: ["url-loader"]
        }
      ]
    },
    plugins: [
      ...dev([new ForkTsCheckerWebpackPlugin()]),
      new CopyWebpackPlugin([
        { from: `${__dirname}/main.html`, to: "main.html" },
        { from: `${__dirname}/header.html`, to: "header.html" },
        { from: `${__dirname}/footer.html`, to: "footer.html" }
      ]),
      new HtmlWebpackPlugin({
        inlineSource: ".(js|css)$",
        template: `${__dirname}/src/index.html`
      }),
      new HtmlWebpackInlineSourcePlugin()
    ],
    devtool: dev("source-map", "none"),
    devServer: {
      contentBase: `${__dirname}/build/`,
      hot: true,
      inline: true
    }
  };
};

module.exports = dev(
  createConfig(themes[0]),
  themes.map(createConfig)
);
