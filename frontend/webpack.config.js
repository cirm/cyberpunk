const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './index.jsx'
  ],
  devtool: 'eval-source-map',
  output: {
    filename: 'index.js',
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
        use: ["css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
          "postcss-loader",
          "stylus-loader"]
      })
    }]
  },
  devServer: {
    hot: true,
    publicPath: '/',
    contentBase: resolve(__dirname, '../dist/public'),
    historyApiFallback: true,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
  ]
};