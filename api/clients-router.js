const express = require('express')

const router = express.Router()

const { Client } = require('../models')

router.get('/', (req, res) => {
  Client.find()
    .then(clients => {
      res.json(clients)
    })
    .catch(error => {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Something went wrong with finding Clients' })
    })
})

module.exports = router
