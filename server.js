/**
 * Production/Testing server for CircleCI
 */
const path = require('path')
const app = require(path.join(__dirname, './prioritizely-backend/dist/app.js'));
const express = require('express')
// console.log(app)

// serve frontend files
app.default.use(express.static(path.resolve(__dirname, './frontend')))

// start the api
require(path.join(__dirname, './prioritizely-backend/dist/index.js'))
