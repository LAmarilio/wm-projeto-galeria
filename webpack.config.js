const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const loader = require('sass-loader');

const modoDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: modoDev ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  devServer: {
    static:{
      directory: path.resolve(__dirname, 'src'),
    },
    port: 9000,
    open: true
  },
  optimization: {
    minimize: !modoDev,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'estilo.css' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/**/*.html', to: '[name][ext]' },
        { from: 'src/imgs', to: 'imgs' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|otf|eot|woff2?|svg)$/,
        type: 'asset/resource'
      }
    ]
  }
};