const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
  dist: path.resolve(__dirname, '..', 'dist', 'desktop'),
};

let htmlMinifyOptions = {
  collapseWhitespace: true,
  html5: true,
  minifyCSS: true,
  removeComments: true,
  removeEmptyAttributes: true,
};

module.exports = () => ({
  entry: `${PATHS.src}/indexDesktop.js`,
  output: {
    path: PATHS.dist,
    filename: 'js/bundle.[hash].js',
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/',
  },
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
              plugins: [
                autoprefixer({
                  browsers: ['ie > 9', 'last 3 version'],
                }),
              ],
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
          'postcss-loader',
        ],
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
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: '/img',
              publicPath: '/img',
            },
          }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css',
      publicPath: './',
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/assets/index.html`,
      minify: htmlMinifyOptions,
    }),
    new FaviconsWebpackPlugin('assets/favicon.png'),
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
      responseStrategy: 'cache-first',
      autoUpdate: '1000 * 60 * 60 * 12', // последнее число колличество часов
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
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