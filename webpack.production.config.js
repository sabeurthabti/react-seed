var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var Clean = require('clean-webpack-plugin');
var sassPaths = require("node-neat").includePaths.map(function (sassPath) {
    return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
    debug: true,
    devtool: "source-map",
    entry: [
        'babel-polyfill',
        './app/app.js'
    ],
    output: {
        path: __dirname + '/assets/',
        filename: '[name].js',
        publicPath: ':3000/assets/'

    },
    preLoaders: [
        {
            test: /(.jsx|.js)?$/,
            loader: "source-map-loader"
        }
    ],
    module: {
        loaders: [
            {test: /(.jsx|.js)?$/, loaders: ['babel-loader'], exclude: /node_modules/},
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
        new Clean(['./assets']),
        new AssetsPlugin({path: path.join(__dirname, '/assets'), filename: 'assets.json'}),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['require', 'export', '$super']
            },
            compress: {
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: false
            }
        })
    ]
};
