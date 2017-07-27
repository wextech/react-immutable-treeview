const webpack = require("webpack");
var path = require("path");
module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./example/App.jsx"
  ],
  output: {
    path: path.join(__dirname, "tmp"),
    filename: "main.js",
    publicPath: "/assets/"
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
