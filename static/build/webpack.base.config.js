const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');
const fs                = require('fs');
const sourcePath        = path.join(__dirname, './static/src');
const outputPath        = path.join(__dirname, './../output/dist/');

const getEntries = srcPath => {
    let fileNames = [];
        fileNames = fs.readdirSync(srcPath);
    let entries   = {};
    fileNames.forEach(filename => {
        let file = filename.slice(0, -3);
        entries[file] = srcPath + '/' + filename;
    });
    return entries;
}

const entries = getEntries('./static/src/pages');

module.exports = {
  // 入口文件
  entry: {
    ...entries,
    vendor: ['react', 'react-dom',],
  },
  // 出口文件
  output: {
    path      : outputPath,
    publicPath: '/static/output/dist/',
    filename  : 'js/[name].js',
  },
  module: {
    // 配置编译打包规则
    rules: [
      {
        test   : /\.(js|jsx)$/,
        exclude: /node_modules/,
        use    : [
          {
            loader: 'babel-loader',
            query : {
              // presets: ['es2015', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use     : ['css-loader']
        }),
      },
      {
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use     : ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use     : ['css-loader', 'less-loader']
        })
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules   : [
      sourcePath,
      'node_modules'
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names    : ['vendor'],
      minChunks: Infinity,
      filename : 'js/[name].js'
    }),
  ]
};