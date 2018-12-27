const express = require('express')

const router = express.Router()

const { Note } = require('../models')

router.get('/:user', (req, res) => {
  res.status(404).json({ message: 'Note GET endpoint not yet implemented' })
})

router.post('/:user', (req, res) => {
  res.status(404).json({ message: 'Note POST endpoint not yet implemented' })
})

router.delete('/:user/:id', (req, res) => {
  res.status(404).json({ message: 'Note DELETE endpoint not yet implemented' })
})

router.put('/:user/:id', (req, res) => {
  res.status(404).json({ message: 'Note PUT endpoint not yet implemented' })
})