const port = process.env.PORT || 8080;
const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const ManifestPlugin = require ('webpack-manifest-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve (__dirname, '../build'),
  },
  mode: 'development',
  devServer: {
    host: 'localhost',
    port,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules',
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true},
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      // {
      //   test: /\.json$/,
      //   type: 'javascript/auto',
      //   use: [require.resolve('json-loader')]
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new MiniCssExtractPlugin ({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin (),
    new ManifestPlugin ({fileName: 'manifest.json', basePath: './build/'}),
  ],
};
