module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/Game.ts',
  output: {
    path: __dirname + '/docs',
    filename: 'dist.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.ts?$/, loader: 'ts-loader' }
    ]
  }
}