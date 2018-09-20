module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    serviceworker: true,
  },
  globals: {
    /**
     * google identity platform api
     */
    gapi: true,
  },
  rules: {
    'react/forbid-prop-types': 0,
  },
  settings: {
    /*
     * Tell eslint where our webpack config is so it can resolve aliases for
     * imports 
     */
    'import/resolver': {
      webpack: {
        config: 'build/webpack.development.js',
      },
    },
  },
};
