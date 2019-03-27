const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const lighttheme = "cerulean litera materia sandstone cosmo flatly lumen minty simplex united journal lux pulse sketchy spacelab".split(
  " "
);
const darktheme = "darkly slate superhero solar cyborg yeti".split(" ");

const createConfig = THEME => {
  const BRIGHTNESS = lighttheme.includes(THEME) ? "light" : "dark";
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
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-typescript",
                  "@babel/preset-react",
                  "@babel/preset-env"
                ],
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  ["global-define", { THEME, BRIGHTNESS }]
                ]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader:"style-loader"
            },
            {
              loader: "css-loader",
              options: {
                url(url) {
                  return !url.match(/\.woff2$/)
                }
              }
            },
            {
              loader: "clean-css-loader"
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
      //new ForkTsCheckerWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: `${__dirname}/README.md`, to: "index.md" },
        { from: `${__dirname}/header.md`, to: "header.md" },
        { from: `${__dirname}/footer.md`, to: "footer.md" }
      ]),
      new HtmlWebpackPlugin({
        inlineSource: ".(js|css)$",
        template: `${__dirname}/src/index.html`
      }),
      new HtmlWebpackInlineSourcePlugin()
    ],
    devtool: process.env.NODE_ENV === "production" ? "none" : "source-map",
    devServer: {
      contentBase: `${__dirname}/build/`,
      hot: true,
      inline: true
    }
  };
};

module.exports =
  process.env.NODE_ENV == "development"
    ? createConfig(lighttheme[0])
    : [...darktheme, ...lighttheme].map(createConfig);
