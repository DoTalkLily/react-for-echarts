var webpack = require('webpack');
// var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  devtool: 'eval-source-map',
  entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './demo/demo.jsx'
  ],
    output: {
        path: __dirname + '/dist',
        publicPath:'/dist', //http://localhost:8080/dist 是根目录
        filename: 'bundle.js'
    },
  module: {
    loaders:[
     {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'react-hot!babel'
    }, {
      test: /\.css$/, 
      loader: 'style-loader!css-loader' 
    }, { 
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=512'
    }]
  },
    devServer: {
      contentBase: './',
      hot: true
    },
  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ]
};
