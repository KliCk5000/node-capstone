const express = require('express');
const passport = require('passport');

const router = express.Router();

const { Client } = require('../models/models');
const { User } = require('../models/models');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res) => {
  User.findOne({ username: req.user.username }).then((currentUserID) => {
    Client.find({ user: currentUserID._id }).populate('user')
      .then((clients) => {
        res.json(clients);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong with finding Clients' });
      });
  });
});

router.get('/:id', jwtAuth, (req, res) => {
  Client.findById(req.params.id).populate('user')
    .populate('notes')
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

router.post('/', jwtAuth, (req, res) => {
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
  User.findOne({ username: req.user.username }).then((currentUser) => {
    Client.findOne({
      $and: [
        { username: currentUser },
        { firstName: req.body.firstName },
        { lastName: req.body.lastName },
      ],
    }).then((clientFound) => {
      if (clientFound) {
        const error = 'Client with that name already exists';
        console.error(error);
        return res.status(400).send(error);
      }
      // Get User id from current user
      console.log(currentUser._id);
      const randomInt = Math.floor(Math.random() * 100);
      Client.create({
        user: currentUser._id,
        userImg: `https://randomuser.me/api/portraits/men/${randomInt}.jpg`,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
      })
        // Create the client
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
});

router.delete('/:id', jwtAuth, (req, res) => {
  Client.findByIdAndDelete(req.params.id).then(() => {
    console.log(`Deleted client with id \`${req.params.id}\``);
    res.status(204).end();
  });
});

router.put('/:id', jwtAuth, (req, res) => {
  // Make sure url ID and body ID are matching
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    return res.status(400).json({ error: 'Request path id and request body id values must match' });
  }
  // Make sure the fields match up to 'updateable' fields
  const updated = {};
  const updateableFields = [
    'firstName',
    'lastName',
    'company',
    'address',
    'phoneNumber',
    'email',
    'notes',
    'reminders',
  ];
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
