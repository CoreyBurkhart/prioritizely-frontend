/**
 * Production/Testing server for CircleCI
 */
const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const PORT = 8080;

// Serve frontend
app.use(express.static(path.resolve(__dirname, './frontend')));

// proxy requests to /api to our api
app.use('/api', proxy({target: 'http://localhost:8081'}));

// start
app.listen(PORT, function() {
  console.log(`Serving frontend on port ${PORT}...`);
})