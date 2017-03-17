const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: {
    index: './index.jsx',
    vendor: ['react', 'react-dom', 'lodash', 'moment', 'redux', 'react-redux', 'react-router', 'immutable', 'redux-immutable', 'socket.io-client']
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: resolve(__dirname, '../dist/public/'),
  },
  context: resolve(__dirname, 'src'),
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
      loader: 'url-loader?limit=100000&name=[name].[ext]',
    }, {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]",
          "postcss-loader",
          "stylus-loader"]
      })
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.styl', 'woff', 'woff2'],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
  ]
};