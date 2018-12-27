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

router.get('/:id', (req, res) => {
  Client.findById(req.params.id)
    .then(client => {
      res.json(client)
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({
        error: 'Something went wrong with finding specific Client by ID'
      })
    })
})

router.post('/', (req, res) => {
  // Check that you have all required fields
  const requiredFields = ['firstName']
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}]\` in request body`
      console.error(message)
      return res.status(400).send(message)
    }
  })
  // Make sure you don't already have a duplicate
  Client.findOne({ firstName: req.body.firstName }).then(clientFound => {
    if (clientFound) {
      const message = `Client with that name already exists`
      return res.status(400).send(message)
    }
    // Create the client
    Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email
    })
      .then(client =>
        res.status(201).json({
          _id: client.id,
          firstName: client.firstName
        })
      )
      .catch(error => {
        console.error(error)
        res.status(500).json({ error: 'Unable to create client' })
      })
  })
})

router.delete('/:id', (req, res) => {
  res.status(404).json({ message: 'Delete endpoint not yet implemented' })
})

router.put('/:id', (req, res) => {
  res.status(404).json({ message: 'Put endpoint not yet implemented' })
})

module.exports = router
