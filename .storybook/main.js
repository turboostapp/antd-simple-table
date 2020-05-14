const path = require("path");
module.exports = {
  stories: ["../stories/*.stories.tsx"],
  addons: ["@storybook/addon-actions"],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        { loader: "less-loader", options: { javascriptEnabled: true } },
      ],
    });

    config.module.rules.push({
      test: /\.tsx$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
        },
      ],
    });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};
