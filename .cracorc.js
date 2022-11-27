module.exports = {
  webpack: {
    alias: {},
    plugins: {
      add: [],
      remove: [],
    },
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        return sassLoaderOptions;
      },
    },
    postcss: {
      plugins: plugins => {
        return [].concat(plugins);
      },
      loaderOptions: (postcssLoaderOptions, { env, paths }) => {
        return postcssLoaderOptions;
      },
    },
  },
  typescript: {
    enableTypeChecking: false,
  },
};
