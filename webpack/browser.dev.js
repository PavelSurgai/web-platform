const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const webpack = require('webpack');

const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = () => ({
  entry: `${PATHS.src}/indexDesktop.js`,
  output: {
    path: PATHS.dist,
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js',
              },
            },
          },
          'sass-loader',
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      { test: /\.xml$/, loader: 'xml-loader' },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[path]/[name].[ext]',
          },
        }],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/assets/index.html`,
    }),
    new FaviconsWebpackPlugin('assets/favicon.png'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // new BundleAnalyzerPlugin(),
    new WebpackPwaManifest({
      name: 'Pitch90Bet',
      short_name: 'Pitch90Bet',
      author: 'Betting-Software',
      description: 'Play and win with the best bookmaker in the CIS',
      display: 'standalone',
      theme_color: '#002857',
      background_color: '#002857',
      crossorigin: 'use-credentials',
      start_url: '.',
      icons: [
        {
          src: path.resolve(__dirname, '..', 'src', 'assets', 'favicon.png'),
          sizes: [96, 128, 192, 256, 320, 512, 768],
        },
      ],
    }),
    new OfflinePlugin({
      responseStrategy: 'network-first',
      autoUpdate: '1000 * 60 * 10', // последнее число колличество минут
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devServer: {
    port: 8000,
    stats: 'errors-only',
    publicPath: '/',
    historyApiFallback: true,
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      minSize: 1,
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -20,
          chunks: 'all',
        },
      },
    },
    namedChunks: true,
  },
});