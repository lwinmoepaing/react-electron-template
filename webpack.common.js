const path = require("path");

// For Package.json
// "watch": "webpack --config webpack.common.js --watch",
// yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader sass sass-loader style-loader webpack webpack-loader dotenv
// yarn add -D webpack-cli electron-reload

const env = {
  DEV: "development",
  PRODUCTIN: "production",
};

// Cofig
const config = {
  env: env.DEV,
  mainEntry: "./src/index.js",
  outputFileName: "bundle.js",
  outputDirectory: path.resolve(__dirname, "build", "js"),
};

module.exports = {
  mode: config.env,
  entry: config.mainEntry,
  devtool: "inline-source-map",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: config.outputFileName,
    path: config.outputDirectory,
  },
};
