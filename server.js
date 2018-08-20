/**
 * Production/Testing server for CircleCI
 */
const path = require('path')
const app = require(path.join(__dirname, './prioritizely-backend/dist/app.js'));
const express = require('express')

// serve frontend files
app.use(express.static(path.resolve('./frontend')))

// start the api
require(path.join(__dirname, './prioritizely-backend/dist/app.js'))
