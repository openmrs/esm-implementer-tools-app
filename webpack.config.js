const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    filename: "openmrs-esm-implementer-tools-app.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "system",
  },
  devtool: "sourcemap",
  module: {
    rules: [
      {
        parser: {
          system: false,
        },
      },
      {
        test: /\.m?(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: "babel-loader",
      },
      {
        test: /node_modules\/.+\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /src\/.+\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
  },
  plugins: [new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin()],
  externals: [
    "react",
    "react-dom",
    "react-router-dom",
    /^@openmrs\/esm/,
    "single-spa",
    "i18next",
    "react-i18next",
  ],
  devServer: {
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
