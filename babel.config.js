module.exports = {
  presets: [
    "@babel/typescript",
    "@babel/react",
    ["@babel/env", { useBuiltIns: "usage", corejs: 3 }]
  ]
};
