const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackBlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: "./src/ts/app.ts",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: isDev ? "inline-source-map" : "none",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "users.html",
      template: "src/users.html",
    }),
    new CleanWebpackBlugin(),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
