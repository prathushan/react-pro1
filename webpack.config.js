const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production"; // ✅ Check environment

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",  // ✅ Ensures React Router works in production
  },
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: isDevelopment ? ["react-refresh/babel"] : [],  // ✅ Only use in development
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),  // ✅ Only add in development
  ].filter(Boolean), // Removes `false` values
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    port: 3000,
    historyApiFallback: true,  // ✅ Fixes empty page with React Router
  },
};
