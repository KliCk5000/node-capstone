const express = require('express');

const router = express.Router();

const { Client } = require('../models');

router.get('/', (req, res) => {
  Client.find()
    .then((clients) => {
      res.json(clients);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong with finding Clients' });
    });
});

router.get('/:id', (req, res) => {
  Client.findById(req.params.id)
    .then((client) => {
      res.json(client);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: 'Something went wrong with finding specific Client by ID',
      });
    });
});

router.post('/', (req, res) => {
  // Check that you have all required fields
  const requiredFields = ['firstName'];
  requiredFields.forEach((field) => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}]\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  // Make sure you don't already have a duplicate
  Client.findOne({ firstName: req.body.firstName }).then((clientFound) => {
    if (clientFound) {
      const error = 'Client with that name already exists';
      console.error(error);
      return res.status(400).json({ message: error });
    }
    // Create the client
    Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    })
      .then(client => res.status(201).json({
        _id: client.id,
        firstName: client.firstName,
      }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Unable to create client' });
      });
  });
});

router.delete('/:id', (req, res) => {
  Client.findByIdAndDelete(req.params.id).then(() => {
    console.log(`Deleted client with id \`${req.params.id}\``);
    res.status(204).end();
  });
});

router.put('/:id', (req, res) => {
  // Make sure url ID and body ID are matching
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    return res.status(400).json({ error: 'Request path id and request body id values must match' });
  }
  // Make sure the fields match up to 'updateable' fields
  const updated = {};
  const updateableFields = ['company', 'address', 'phoneNumber', 'email', 'notes', 'reminders'];
  updateableFields.forEach((field) => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  // FindIDandUpdate
  Client.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(error => res.status(500).json({ message: error }));
});

module.exports = router;
