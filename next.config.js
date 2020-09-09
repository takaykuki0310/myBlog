const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)?$/,
  options: {
    remarkPlugins: [require("remark-math")],
    rehypePlugins: [
      require("@mapbox/rehype-prism"),
      require("rehype-join-line"),
      require("rehype-katex"),
    ],
  },
});

const nextConfig = {
  target: "serverless",

  pageExtensions: ["jsx", "js", "mdx", "md", "ts", "tsx"],

  cssModules: true,

  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },

  env: {
    VERSION: require("./package.json").version,
  },

  webpack(config) {
    // eslint-disable-next-line no-undef
    config.resolve.modules.push(__dirname);
    return config;
  },

  experimental: {
    redirects() {
      return [
        {
          source: "/blog/others/:path*",
          permanent: true,
          destination: "/posts/:path*",
        },
        {
          source: "/blog/others/:path*/",
          permanent: true,
          destination: "/posts/:path*",
        },
        {
          source: "/blog/js/:path*",
          permanent: true,
          destination: "/posts/:path*",
        },
        {
          source: "/blog/js/:path*/",
          permanent: true,
          destination: "/posts/:path*",
        },
        {
          source: "/blog/proxy/:path*",
          permanent: true,
          destination: "/posts/:path*",
        },
        {
          source: "/blog/proxy/:path*/",
          permanent: true,
          destination: "/posts/:path*",
        },
        {
          source: "/blog/2019/:month/:day/",
          permanent: true,
          destination: "/posts/2019:month:day",
        },
        {
          source: "/blog/2019/:month/:day",
          permanent: true,
          destination: "/posts/2019:month:day",
        },
        {
          source: "/blog/2020/:month/:day/",
          permanent: true,
          destination: "/posts/2020:month:day",
        },
        {
          source: "/blog/2020/:month/:day",
          permanent: true,
          destination: "/posts/2020:month:day",
        },
        {
          source: "/whoami",
          permanent: true,
          destination: "/fixed/profile",
        },
        {
          source: "/whoami/",
          permanent: true,
          destination: "/fixed/profile",
        },
        {
          source: "/blog",
          permanent: true,
          destination: "/posts",
        },
        {
          source: "/blog/",
          permanent: true,
          destination: "/posts",
        },
        {
          source: "/index",
          statusCode: 301,
          destination: "/",
        },
        {
          source: "/index/",
          statusCode: 301,
          destination: "/",
        },
      ];
    },
  },
};

module.exports = withMDX(nextConfig);
