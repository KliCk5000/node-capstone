const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../../app');
const { TEST_PORT, TEST_DATABASE_URL } = require('../../config');
const { Client, Note } = require('../../models/models');

const { expect } = chai;

let authToken = '';
let userId = '';
const testUser = { username: 'Chai', password: 'mochamocha' };

chai.use(chaiHttp);

function tearDownOldDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting any previous database');
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedClientData() {
  // this will return a promise
  const seedData = [];

  for (let i = 1; i <= 3; i += 1) {
    seedData.push({
      user: userId,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phoneNumber: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      company: faker.company.companyName(),
      email: faker.internet.exampleEmail(),
    });
  }
  return Client.insertMany(seedData);
}

function seedNoteData() {
  return chai
    .request(app)
    .get('/api/clients/')
    .set('Authorization', `Bearer ${authToken}`)
    .then(res => res.body)
    .then(clients => clients.forEach(client => addNotes(client)));
}

function addNotes(client) {
  const seedNotes = [
    {
      client: client._id,
      description: 'Test',
      noteBody: 'testing',
    },
    {
      client: client._id,
      description: 'Test',
      noteBody: 'testing',
    },
    {
      client: client._id,
      description: 'Test',
      noteBody: 'testing',
    },
  ];
  Note.insertMany(seedNotes);
}

function registerTestUser() {
  return chai
    .request(app)
    .post('/api/users')
    .send(testUser);
}

function loginTestUser() {
  return chai
    .request(app)
    .post('/api/auth/login')
    .send(testUser)
    .then(res => res.body.authToken);
}

function getUserId() {
  return chai
    .request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${authToken}`)
    .then((user) => {
      userId = user.body._id;
      return true;
    });
}

function setAuthToken(token) {
  authToken = token;
  return true;
}

function getAClient() {
  return chai
    .request(app)
    .get('/api/clients/')
    .set('Authorization', `Bearer ${authToken}`)
    .then(res => res.body[0]);
}

function getANote(client) {
  return chai
    .request(app)
    .get(`/api/notes/${client._id}`)
    .set('Authorization', `Bearer ${authToken}`)
    .then(res => res.body[0]);
}

describe('Note Endpoint tests', () => {
  before(() => runServer(TEST_DATABASE_URL, TEST_PORT)
    .then(() => tearDownOldDb())
    .then(() => registerTestUser())
    .then(() => loginTestUser())
    .then(token => setAuthToken(token))
    .then(() => getUserId())
    .then(() => seedClientData())
    .then(() => seedNoteData()));
  after(() => closeServer());

  describe('GET "/api/notes/"', () => {
    it('request to (/:clientId) should return all notes of a client', () => getAClient().then(client => chai
      .request(app)
      .get(`/api/notes/${client._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        chai
          .request(app)
          .get(`/api/notes/${client._id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .then((res) => {
            expect(res).to.have.status(200);
          });
      })));
    it('request to (/:clientId/:id) should return specific note', () => getAClient()
      .then(client => getANote(client))
      .then(note => chai
        .request(app)
        .get(`/api/notes/${note.client}/${note._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .then((res) => {
          expect(res).to.have.status(200);
        })));
  });

  describe('POST request to "/api/notes/"', () => {
    const postedNote = { description: 'Post', noteBody: 'Posted' };
    it('request to (/:clientId) should create a note for client', () => getAClient().then(client => chai
      .request(app)
      .post(`/api/notes/${client._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(postedNote)
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.include(postedNote);
      })));
  });

  describe('DELETE request to "/api/notes/"', () => {
    it('request to (/:id) should delete a specific note', () => getAClient()
      .then(client => getANote(client))
      .then(note => chai
        .request(app)
        .delete(`/api/notes/${note._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .then((res) => {
          expect(res).to.have.status(204);
        })));
  });

  describe('PUT request to "/api/notes/"', () => {
    it('request to (/:id) should update a specific note', () => getAClient()
      .then(client => getANote(client))
      .then(note => chai
        .request(app)
        .put(`/api/notes/${note._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ id: note._id, description: 'update', noteBody: 'updated' })
        .then((res) => {
          expect(res).to.have.status(200);
        })));
  });
});
