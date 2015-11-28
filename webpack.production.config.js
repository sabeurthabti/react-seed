var webpack             = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
ar HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './app/client/js/buddycar.js',
  output: {
    path: path.join(__dirname, 'app/dist'),
    filename: '[name]-[hash].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name]-[hash].css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'My App'
    }),
    new AssetsPlugin({path: path.join(__dirname, 'app'), filename: 'assets.json'})
  ],

  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.jsx', '.scss']
  }
}
