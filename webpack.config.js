const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const devConfig = require('./environments/dev');
const uatConfig = require('./environments/uat');
const prodConfig = require('./environments/prod');

const outputDirectory = 'dist';

const config = (env) => {
  return {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|jpg|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    devServer: {
      port: 3000,
      open: true,
      proxy: {
        '/api': 'http://localhost:8080'
      }
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        APP_CONFIG: environmentConfig(env)
      }),
      new CleanWebpackPlugin(),
      new ManifestPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      })
    ]
  };
};

const environmentConfig = (env) => {
  if (env === 'DEV') {
    return devConfig;
  } else if (env === 'UAT') {
    return uatConfig;
  } else {
    return prodConfig;
  }
};

module.exports = (env) => {
  return config(env);
};
