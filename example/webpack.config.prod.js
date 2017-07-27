var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
var TransferWebpackPlugin = require("transfer-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

const { app } = require("./appconfig/settings");

module.exports = {
  entry: {
    app: "./example/App.jsx",
    babelPolyfill: "babel-polyfill"
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[id].[chunkhash].js",
    publicPath: "/assets/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: ["react-hot-loader", "babel-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}