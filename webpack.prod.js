const { merge } = require('webpack-merge');
const common = require('./webpack.common');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 40,
          progressive: true,
        }),
      ],
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
  ],
  optimization: {
    minimizer: [new BabelMinifyPlugin()],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
