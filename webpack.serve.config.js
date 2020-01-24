const path = require("path");
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = process.env.DEV !== "production";
// const webpack = require('webpack');
const config = {
  entry: {
    app: path.resolve(__dirname, "src/js/components/App.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/src/assets",
    filename: "ssr/[name].js",
    libraryTarget: 'commonjs2'
    // chunkFilename: devMode ? "app.js" : "app.[hash].js"
  },
  target:'node',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 20000,
            fallback: "file-loader",
            name: devMode ? "img/[name].[ext]" : "img/[name].[hash].[ext]"
          }
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  plugins: [
    // new HtmlWebpackPlugin(),
    //   new MiniCssExtractPlugin({
    //       filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
    //       chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    //   }),
    //   new webpack.DllReferencePlugin({
    //       manifest: require('./modules-manifest.json'),
    //   }),
  ]
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
  }
  if (argv.mode === "production") {
    // config.plugins.push(new CleanWebpackPlugin())
  }
  return config;
};
