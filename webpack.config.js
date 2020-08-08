const path = require('path');
const webpackMerge = require('webpack-merge');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');

const loadModeConfig = env => require(`./build-utils/${env.mode}.config`)(env);

module.exports = env =>
  webpackMerge({
      mode: env.mode,
      context: path.resolve(__dirname, 'src'),
      mode: 'production',
      entry: './index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      module: {
        rules: [{
            test: /\.js$/,
            exclude: /node-modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
              loader: 'url-loader',
              options: {
                name: '[path]/[name].[ext]',
                limit: 5000,
              },
            }, ],
          },
          {
            test: /\.html$/,
            use: 'html-loader',
          },
          {
            test: /\.hbs$/,
            use: 'handlebars-loader',
          },
          {
            test: /\.css$/,
            include: [
              path.resolve(__dirname, "not_exist_path")
            ],
            loader: "style!css"
          },
          {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url?limit=512&&name=[path][name].[ext]?[hash]'
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar(),
      ],
    },
    loadModeConfig(env),
  );