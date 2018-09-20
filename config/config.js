const env = process.env.NODE_ENV;

const development = {};
const test = {};
const production = {};
const config = {
  development,
  test,
  production
}

if (! env in config) {
  console.warn(`NODE_ENV=${env}. Defaulting to "development" environment.`)
}

module.exports = config[env] || development;
