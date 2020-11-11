const path = require("path");
const package_ = require("./package.json");

module.exports = {
  entry: "./src/index.ts",
  mode: process.env.NODE_ENV || "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  devtool: process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map",
  optimization: {
    minimize: false,
  },
  target: "node",
  output: {
    filename: path.basename(package_.main),
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "umd",
      name: package_.name,
    },
  },
};
