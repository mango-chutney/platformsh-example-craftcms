const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: [path.resolve('./src/main.tsx')],
  },
  output: {
    path: path.resolve(__dirname, './web/assets/'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('./src/static'),
          flatten: true,
        },
      ],
      options: {
        copyUnmodified: true,
      },
    }),
    new ManifestPlugin({
      basePath: 'assets/',
      writeToFileEmit: true,
      filter: (file) =>
        !file.path.endsWith('.svg') &&
        !file.path.endsWith('.woff') &&
        !file.path.endsWith('.woff2') &&
        !file.path.endsWith('.eot') &&
        !file.path.endsWith('.ttf'),
    }),
  ],
};
