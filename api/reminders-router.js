const express = require('express')

const router = express.Router()

const { Reminder } = require('../models')

router.get('/:user', (req, res) => {
  res.status(404).json({ message: 'Reminder GET endpoint not yet implemented' })
})

router.post('/:user', (req, res) => {
  res
    .status(404)
    .json({ message: 'Reminder POST endpoint not yet implemented' })
})

router.delete('/:user/:id', (req, res) => {
  res
    .status(404)
    .json({ message: 'Reminder DELETE endpoint not yet implemented' })
})

router.put('/:user/:id', (req, res) => {
  res.status(404).json({ message: 'Reminder PUT endpoint not yet implemented' })
})
