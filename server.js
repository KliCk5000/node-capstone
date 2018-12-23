const express = require('express')
const morgan = require('morgan')
// const faker = require('faker');
const mongoose = require('mongoose')

// Change mongoose's promise to ES6
mongoose.Promise = global.Promise

// Variables needed from configs.js
const { PORT, DATABASE_URL } = require('./config')

// Create the express app
const app = express()

// Let express know to grab files from public folder
app.use(express.static('public'))
app.use(morgan('common')) // Our server logger

if (require.main === module) {
  app.listen(process.env.PORT || 8080, () => {
    console.info(`App listening on ${this.address().port}`)
  })
}

function runServer(databaseUrl = DATABASE_URL, port = PORT) {}

function closeServer() {}

module.exports = { app }
