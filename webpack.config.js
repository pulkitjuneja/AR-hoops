const path = require('path');

module.exports = {
  entry: [
    './src/main.js'
  ],
  output: { path: __dirname, filename: 'bundle.js' },
  cache: true,
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl',
        include: [
          path.resolve(__dirname, 'src', 'shaders')
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
  }
};
