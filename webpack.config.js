var webpack             = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/client/App.jsx'],
    client: 'webpack-dev-server/client?http://localhost:8080',
    output: {
      path: path.join(__dirname, 'app/assets'),
      filename: '[name].js'
    },

    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loaders: ['react-hot', 'babel'],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract('css!sass')
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('[name].css', {
        allChunks: true
      }),

      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new AssetsPlugin({path: path.join(__dirname, 'app/assets'), filename: 'assets.json'})
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
      stats: { colors: true },
      proxy: {
        "*": "http://localhost:3000"
      },
      watchOptions: {
        aggregateTimeout: 50,
      }
    }
  }
