const webpack = require('webpack');
const path = require('path');
const env = process.env['npm_config_env'] || "production";
const preprocessOptJson = JSON.stringify(({
  "local": {},
  "development": {},
  "staging": {},
  "production": {}
})[env]);
module.exports = {
  context: path.join(__dirname, 'lib'),
  entry: './index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'sofr.js'
  },
  devtool: "source-map",
  resolve: {
    extensions: ['', '.webpack.js', '.html', '.ts', '.js']
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader!preprocess?' + preprocessOptJson
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: "html-loader"
    }],
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "source-map-loader"
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
