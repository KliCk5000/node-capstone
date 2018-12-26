const express = require('express')
const morgan = require('morgan')
// const faker = require('faker');
const mongoose = require('mongoose')

const { Client } = require('./models')

// Change mongoose's promise to ES6
mongoose.Promise = global.Promise

// Variables needed from configs.js
const { PORT, DATABASE_URL } = require('./config')

// Create the express app
const app = express()

// Let express know to grab files from public folder
app.use(express.static('public'))
app.use(morgan('common')) // Our server logger

app.get('/clients', (req, res) => {
  Client.find().then(clients => {
    res.json(
      clients.map(client => ({
        id: client._id,
        firstName: client.firstName
      }))
    )
  })
})

let server

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  const options = { useCreateIndex: true, useNewUrlParser: true }
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      options,
      err => {
        if (err) {
          return reject(err)
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`)
            return resolve()
          })
          .on('error', error => {
            mongoose.disconnect()
            return reject(error)
          })
      }
    )
  })
}

function closeServer() {
  return mongoose.disconnect().then(
    () =>
      new Promise((resolve, reject) => {
        console.log('Closing Server')
        server.close(error => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      })
  )
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(error => console.error(error))
}

module.exports = { app, runServer, closeServer }
