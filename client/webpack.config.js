const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
// const fs = require('fs');

// const distDir = path.resolve(__dirname, 'client/dist');
// const srcDir = path.resolve(__dirname, 'client/src');

// if (!fs.existsSync(distDir)) {
//   fs.mkdirSync(distDir);
// }

module.exports = {
  mode: 'development',
  entry: './src/js/index.js', //correct this to 'src/js/index.js'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // Corrected this to template and title
      template: './index.html', //corrected this to './index.html'
      title:'J.A.T.E'
    }),
    new WebpackPwaManifest({
      name: 'Text Create',
      short_name: 'Text Editor',
      description: 'Ability to write whatever you like!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve(`src/images/logo.png`),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets/icons'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve('src-sw.js'),// this should 'src-sw.js'
      swDest: 'src-sw.js', // this should be 'src-sw.js'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
    ],
  },
};