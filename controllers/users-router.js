const express = require('express');
const passport = require('passport');

const router = express.Router();

const { User } = require('../models/models');

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res) => {
  User.findOne({ username: req.user.username })
    .then(response => res.json(response));
});

// Post this endpoint to register a new user
router.post('/', (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      type: 'error',
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField,
    });
  }

  const stringFields = ['username', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string',
  );

  if (nonStringField) {
    return res.status(422).json({
      type: 'error',
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField,
    });
  }

  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field],
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      type: 'error',
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField,
    });
  }

  const sizedFields = {
    username: { min: 1 },
    password: { min: 6, max: 72 },
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field => 'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].min,
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field => 'max' in sizedFields[field] && req.body[field].trim().length > sizedFields[field].max,
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      type: 'error',
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
        : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
      location: tooSmallField || tooLargeField,
    });
  }

  const { username, password } = req.body;
  let { firstName = '', lastName = '' } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({ username })
    .countDocuments()
    .then((count) => {
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          type: 'error',
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username',
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);
    })
    .then(hash => User.create({
      username,
      password: hash,
      firstName,
      lastName,
    }))
    .then(user => res.status(201).json(user.serialize()))
    .catch((error) => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (error.reason === 'ValidationError') {
        return res.status(error.code).json(error);
      }
      res.status(500).json({ code: 500, message: 'Internal server error' });
    });
});

module.exports = router;
