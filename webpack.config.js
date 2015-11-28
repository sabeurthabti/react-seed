var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var Clean = require('clean-webpack-plugin');

var sassPaths = require("node-neat").includePaths.map(function (sassPath) {
    return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
    entry: [
        'babel-polyfill', // to enable es7
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/client/app.js'],
    styles: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', './app/client/App.scss'],
    output: {
        path: path.join(__dirname, 'app/assets'),
        filename: '[name].js'
    },
    debug: true,
    // devtools and preLoaders to get clean es6/jsx sourceMap
    devtool: "#inline-source-map",
    preLoaders: [
        {
            test: /(.jsx|.js)?$/,
            loader: "source-map-loader"
        }
    ],
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

    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                WEBPACK: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new AssetsPlugin({path: path.join(__dirname, 'app/assets'), filename: 'assets.json'}),

        // clean
        // new Clean(['app/assets'])
    ],

    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json', '.jsx', '.scss']
    },

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
