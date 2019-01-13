const express = require('express');

const router = express.Router();

const { Note } = require('../models/models');
const { Client } = require('../models/models');
const { User } = require('../models/models');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/:clientId', jwAuth, (req, res) => {
  res.status(404).json({ message: 'Note GET endpoint not yet implemented' });
});

router.get('/:clientId/:id', jwAuth, (req, res) => {
  res.status(404).json({ message: 'Note GET endpoint not yet implemented' });
});

router.post('/:clientId', jwAuth, (req, res) => {
  res.status(404).json({ message: 'Note POST endpoint not yet implemented' });
});

router.delete('/:clientId/:id', jwAuth, (req, res) => {
  res.status(404).json({ message: 'Note DELETE endpoint not yet implemented' });
});

router.put('/:clientId/:id', jwAuth, (req, res) => {
  res.status(404).json({ message: 'Note PUT endpoint not yet implemented' });
});
