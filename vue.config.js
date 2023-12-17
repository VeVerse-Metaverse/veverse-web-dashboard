const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      filename: "[name].[contenthash:16].js",
      chunkFilename: "[name].[contenthash:16].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
  },
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      definitions[0]["process.env"]["API_V1"] = `"${process.env.API_V1}"`;
      definitions[0]["process.env"]["API_V2"] = `"${process.env.API_V2}"`;
      return definitions;
    });
  },
});
