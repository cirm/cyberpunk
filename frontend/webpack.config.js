const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './index.jsx',
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
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer({
                browsers: ['last 3 versions', '> 1%'],
              })],
            },
          },
          'stylus-loader'],
      }),
    }, {
      test: /\.png$/,
      loader: 'url-loader',
      query: { mimetype: 'image/png' },
    }, {
      test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=src/fonts/[name].[ext]',
    }, {
      test: /\.woff$/,
      loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=src/fonts/[name].[ext]',
    }, {
      test: /\.woff2$/,
      loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=src/fonts/[name].[ext]',
    }, {
      test: /\.[ot]tf$/,
      loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=src/fonts/[name].[ext]',
    }, {
      test: /\.eot$/,
      loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=src/fonts/[name].[ext]',
    }],
  },
  devServer: {
    hot: true,
    publicPath: '/',
    contentBase: resolve(__dirname, '../dist/public'),
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.styl', '.woff', '.woff2', '.eot', '.svg', '.ttf'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
  ],
};
