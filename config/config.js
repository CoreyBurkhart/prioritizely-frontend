const env = process.env.NODE_ENV

const development = {
  port: 8080,
  db: {
    host: 'localhost',
    port: 27017,
    name: 'prioritizely-development'
  }
}

const test = {
  port: 8080,
  db: {
    host: 'localhost',
    port: 27017,
    name: 'prioritizely-test'
  }
}

const production = {

}

const config = {
  development,
  test,
  production
}

if(! env in config) {
  console.warn(`NODE_ENV=${env}. Defaulting to "development" environment.`)
}

module.exports = config[env] || development