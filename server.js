/**
 * Production/Testing server for CircleCI
 */
const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const chalk = require('chalk');
const app = express();
const PORT = 8080;
const frontendDir = path.resolve(__dirname, './frontend');
const proxyTarget = 'http://localhost:8081';

const log = str => console.info(chalk.blue(str));

// proxy requests to /api to our api
log(`Requests to "/api" will be proxied to ${proxyTarget}`);
app.use(/^\/api\/.+/, proxy({target: proxyTarget, verbose: true}));

// Serve frontend
log(`Serving frontend files from ${frontendDir}`);
app.use(express.static(frontendDir));

// history api fallback
app.use(history());
// this needs to be here to serve index.html
app.use(express.static(frontendDir)); 

// start
app.listen(PORT, function() {
  log(`Serving frontend on port ${PORT}...`);
})