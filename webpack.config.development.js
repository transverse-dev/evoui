const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs_dev'),
    publicPath: '/', // 빌드 파일 절대 경로(중첩된 route 문제)
    clean: true, // 빌드하기 전에 build 폴더 정리
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendor: false,
        framework: {
          name: 'framework',
          test: /\/node_modules\/(react|react-dom|react-router-dom)\//,
          priority: 40,
          enforce: true,
        }, // core framework
        commons: { name: 'commons', test: /\/node_modules\//, priority: 20 }, // 그 외의 모듈에 대한 chunk
      },
    },
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
            },
          },
          {
            loader: 'img-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: 'src/index.development.html',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: 'source-map',
};
