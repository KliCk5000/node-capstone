const express = require('express');
const passport = require('passport');

const router = express.Router();

const { Client } = require('../../models/models');
const { User } = require('../../models/models');
const { Notes } = require('../../models/models');

const jwtAuth = passport.authenticate('jwt', { session: false });

describe('Note Endpoint tests', () => {
  describe('GET "/api/notes/"', () => {
    it('request to (/:clientId) should return all notes of a client');
    it('request to (/:clientId/:id) should return specific note');
  });
  describe('POST request to "/api/notes/"', () => {
    it('request to (/:clientId) should create a note for client');
  });
  describe('DELETE request to "/api/notes/"', () => {
    it('request to (/:id) should delete a specific note');
  });
  describe('PUT request to "/api/notes/"', () => {
    it('request to (/:id) should update a specific note');
  });
});
