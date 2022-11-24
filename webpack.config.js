const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin-next')
const webpack = require("webpack")

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.browser': 'true'
    }),
    //new WebpackShellPlugin({
    //  onBuildEnd:{
    //    scripts: ['npm run watch'],
    //    blocking: false,
    //    parallel: true
    //  }
    //})
  ],
  target: 'node',
}