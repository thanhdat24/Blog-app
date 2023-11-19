const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "q-force-wiki.hotanloc.xyz",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
  webpack: (config, options) => {
    const { isServer } = options;
    // config.experiments = { topLevelAwait: true };

    config.plugins.push(
      new NextFederationPlugin({
        name: "main",
        remotes: {
          shop: `shop@http://localhost:3001/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./footer": "./components/Footer.tsx",
          "./header": "./components/Header.tsx",
          "./nav": "./components/Nav.js",
        },
      })
    );
    config.cache = false;
    config.output.publicPath = "http://localhost:3000/_next/";
    return config;
  },
};

module.exports = nextConfig;
