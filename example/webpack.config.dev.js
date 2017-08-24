const webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./example/App.jsx"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[id].[hash].js",
    publicPath: ""
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx"]
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
    new HtmlWebpackPlugin({
      template: "./example/index.html", // Load a custom template
      inject: "body", // Inject all scripts into the body
      title: "React Immutable Tree",
      base: "/",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
