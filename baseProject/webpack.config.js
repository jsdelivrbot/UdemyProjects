module.exports = {
  entry: [
    './src/index.js'
  ],
  devtool: "inline-source-map",
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
      test: /\.js$/, // Check for all js files
      exclude: /node_modules/,
      use: [{
           loader: 'babel-loader',
           options: { presets: ['env', 'react'] }
         }]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
