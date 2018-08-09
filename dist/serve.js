'use strict';

var express = require('express');
var app = express();
var path = require('path');
var config = require(path.resolve(__dirname, './../../config/config.js'));
var frontend_path = path.resolve(__dirname, './../client');

app.use(express.static(frontend_path));

app.listen(config.port, function () {
  console.log('Server listening on ports ' + config.port + '...');
});
