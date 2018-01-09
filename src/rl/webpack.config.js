var webpack = require('webpack');
module.exports = {  
	entry: {
		app: './game/game.js'
	},
  output: {
    filename: '[name].bundle.js',
    libraryTarget: "var",
    library: "RL"
  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  // Add minification
  plugins: [
//	  new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  }
}