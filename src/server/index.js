const express = require('express')
const app = express()
const path = require('path')
const config = require(path.resolve(__dirname, './../../config/config.js'))
const frontend_path = path.resolve(__dirname, './../client')

app.use(express.static(frontend_path))

console.log(process.env.NODE_ENV)

app.listen(config.port, () => {
  console.log(`Server listening on ports ${config.port}...`)
})