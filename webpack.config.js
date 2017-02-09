var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: './app/index.html'
      }),
      new webpack.EnvironmentPlugin([
        'NODE_SERVER_STARTUP_TIMEOUT'
      ])
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }
	    ]
    }
};
