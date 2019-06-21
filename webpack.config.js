const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {

  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "/dist"),
      filename: "index_bundle.js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {},
            },
          ],
        },
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
      new webpack.DefinePlugin(envKeys)
    ]
 }
};