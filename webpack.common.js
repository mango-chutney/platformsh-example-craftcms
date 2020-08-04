const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    main: [
      path.resolve('./src/main.js'),
      path.resolve('./src/styles/main.scss'),
    ],
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
        loader: 'babel-loader',
        include: [
          path.resolve('./src'),
          path.resolve(__dirname, './signup'),
          path.resolve(__dirname, './node_modules/mango-components'),
          path.resolve(__dirname, './node_modules/artez-client-apis'),
          path.resolve(__dirname, './node_modules/luhnify'),
          path.resolve(__dirname, './node_modules/udf-mapper'),
          path.resolve(__dirname, './node_modules/bad-words'),
          path.resolve(__dirname, './node_modules/dirty-json'),
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve('./node_modules/foundation-sites/scss'),
                  path.resolve('./node_modules/tristicons/dist/scss'),
                  path.resolve('./node_modules/react-smartbanner/src/styles'),
                ],
              },
            },
          },
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns:[
        {
          from: path.resolve('./src/static'),
          flatten: true,
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
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
