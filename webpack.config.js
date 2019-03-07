const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkgJson = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


let config = {
  mode: 'none',
  entry: [
    './src/index.js'
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {warnings: false}
      }
    })],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'html-custom-elements.umd.js',
    library: pkgJson.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.js$/,
        exclude: /(node_modules|or_any)/,
        use: {loader: 'babel-loader', options: {presets: ['@babel/preset-env']}}
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    new CleanWebpackPlugin(['dist/*'])
  ]
};

if (process.env.ENV === 'demo') {
  console.log('[webpack-dev-server] mode', process.env.ENV);
  config = Object.assign(config, {
    entry: {
      app: './demo'
    },
    output: {
      path: path.resolve(__dirname, './docs'),
      filename: '[name].js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'demo/index.html',
        inject: true
      }),
      new CopyWebpackPlugin(['demo/*.html', 'demo/*.css', '!demo/index.html'])
    ]
  });
}

module.exports = config;
