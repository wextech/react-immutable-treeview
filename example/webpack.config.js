const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './example/app.js'
    ],
    output: {
        path: __dirname,
        filename: 'main.js',
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            use: ['react-hot-loader', 'babel-loader']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};