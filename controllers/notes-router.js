const express = require('express');
const passport = require('passport');

const router = express.Router();

const { Note } = require('../models/models');
const { Client } = require('../models/models');
const { User } = require('../models/models');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/:clientId', jwtAuth, (req, res) => {
  Note.find({ client: req.params.clientId })
    .then(notes => res.json(notes));
});

router.get('/:clientId/:id', jwtAuth, (req, res) => {
  res.status(404).json({ message: 'Note GET endpoint not yet implemented' });
});

router.post('/:clientId', jwtAuth, (req, res) => {
  // First, do you have all the required fields?
  const requiredFields = ['user', 'description', 'noteBody'];
  requiredFields.forEach((field) => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  Note.create({
    user: req.params.clientId,
    description: req.body.description,
    noteBody: req.body.noteBody,
  })
    .then(note => res.status(201).json({
      _id: note.id,
      user: note.user,
    }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Unable to create note' });
    });
});

router.delete('/:clientId/:id', jwtAuth, (req, res) => {
  res.status(404).json({ message: 'Note DELETE endpoint not yet implemented' });
});

router.put('/:clientId/:id', jwtAuth, (req, res) => {
  res.status(404).json({ message: 'Note PUT endpoint not yet implemented' });
});

module.exports = router;
