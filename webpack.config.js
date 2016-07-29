var webpack = require('webpack');
var path = require("path");
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var sassPaths = require("node-neat").includePaths.map((sassPath) => {
  return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
  debug: true,
  devtool: "#inline-source-map",
  entry: [
    'babel-polyfill', // to enable es7
    './app/app.js'],
    styles: ['./app/style/App.scss'],
    output: {
      path: path.join(__dirname, 'assets'),
      filename: '[name].js'
      // publicPath: ':8080/' // when running webpack-dev-server
    },

    module: {
      loaders: [
        {
          test: /(.jsx|.js)?$/,
          loaders: ['react-hot', 'babel'],
          exclude: /node_modules/
        },
          { test: /(.jsx|.js)?$/, loader: "eslint-loader", exclude: /node_modules/ },
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
    ]
  };
