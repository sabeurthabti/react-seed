var webpack = require('webpack');
var path = require("path");
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var sassPaths = require("node-neat").includePaths.map(function (sassPath) {
    return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
    debug: true,
    devtool: "#inline-source-map",
    entry: [
        'babel-polyfill', // to enable es7
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/app.js'],
    styles: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', './app/style/App.scss'],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].js',
        publicPath: ':8080/' // when running webpack-dev-server
    },

    module: {
        loaders: [
            {
                test: /(.jsx|.js)?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer!sass?sourceMap&' + sassPaths)
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.scss']
    },

    plugins: [
        new AssetsPlugin({path: path.join(__dirname, '/assets'), filename: 'assets.json'}),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    devServer: {
        // contentBase: './app/assets',
        historyApiFallback: true,
        // host: 'localhost',
        hot: true,
        port: 8080,
        // publicPath: '/',
        publicPath: 'http://localhost:3000/',
        noInfo: false,
        stats: {colors: true},
        proxy: {
            "*": "http://localhost:3000"
        },
        watchOptions: {
            aggregateTimeout: 50
        }
    }
};
