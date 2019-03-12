const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const PostCSSPresetEnv = require('postcss-preset-env');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, './src/js/main.js'),
    path.resolve(__dirname, './src/scss/style.scss')
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourcemap: true,
              plugins() {
                return [
                  precss,
                  autoprefixer,
                  PostCSSPresetEnv()
                ];
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname),
    watchContentBase: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    https: false,
    noInfo: true,
    inline: true,
    host: '192.168.1.16',
    port: 3000,
    disableHostCheck: true
  }
};
