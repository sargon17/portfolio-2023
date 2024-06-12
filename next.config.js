const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "wp.portfolio.kaylo.it"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  webpack: (config, options) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        test: /\.(graphql|gql)/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
