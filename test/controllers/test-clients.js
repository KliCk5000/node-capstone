const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../../app');
const { TEST_PORT, TEST_DATABASE_URL } = require('../../config');
const { Client } = require('../../models/models');

const { expect } = chai;

let authToken = '';
let userId = '';
const testUser = { username: 'Chai', password: 'mochamocha' };

chai.use(chaiHttp);

// this function deletes the entire test database.
function tearDownOldDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting any previous database');
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedClientData() {
  // this will return a promise
  const seedData = [];

  for (let i = 1; i <= 5; i += 1) {
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

describe('Client endpoint tests', () => {
  before(() => runServer(TEST_DATABASE_URL, TEST_PORT)
    .then(() => tearDownOldDb())
    .then(() => registerTestUser())
    .then(() => loginTestUser())
    .then(token => setAuthToken(token))
    .then(() => getUserId())
    .then(() => seedClientData()));
  after(() => closeServer());

  describe('GET "/api/clients/"', () => {
    it('request to (/) should return a list of clients', () => chai
      .request(app)
      .get('/api/clients/')
      .set('Authorization', `Bearer ${authToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.lengthOf.at.least(1);
      }));

    it('request to (GET /:id) with WRONG ID should return null', () => chai
      .request(app)
      .get('/api/clients/5c4fc12d0c7019685cd81e00')
      .set('Authorization', `Bearer ${authToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.equal(null);
      }));

    it('request to (GET /:id) should return a single client from an ID', () => {
      let clientId = '';
      return chai
        .request(app)
        .get('/api/clients/')
        .set('Authorization', `Bearer ${authToken}`)
        .then((res) => {
          clientId = res.body[0]._id;
          return chai
            .request(app)
            .get(`/api/clients/${clientId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .then((res) => {
              expect(res.body).to.be.an('object');
              expect(res.body._id).to.equal(clientId);
            });
        });
    });
  });

  describe('POST "/api/clients/"', () => {
    it('request to (/) should add a client to user list of clients', () => {
      const newClient = {
        firstName: 'Test',
        lastName: 'Tester',
        company: 'Testing Inc.',
        address: '999 Testing way',
        phoneNumber: '555-555-5555',
        email: 'testing.client@gmail.com',
        notes: 'Molestiae eum a est amet qui.',
        reminders: 'Aut commodi vitae.',
      };
      return chai
        .request(app)
        .post('/api/clients/')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newClient)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
        });
    });
  });

  describe('DELETE "/api/clients/:id"', () => {
    it('request to (/:id) should delete a specific client by ID', () => {
      let clientId = '';
      return chai
        .request(app)
        .get('/api/clients/')
        .set('Authorization', `Bearer ${authToken}`)
        .then((res) => {
          clientId = res.body[0]._id;
          return chai
            .request(app)
            .delete(`/api/clients/${clientId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .then((res) => {
              expect(res).to.have.status(204);
            });
        });
    });
  });

  describe('PUT "/api/clients/:id"', () => {
    it('request to (/:id) should find and update a client by ID', () => {
      const updateClient = {
        firstName: 'Test123',
        lastName: 'Tester123',
      };
      let clientId = '';
      return chai
        .request(app)
        .get('/api/clients/')
        .set('Authorization', `Bearer ${authToken}`)
        .then((res) => {
          clientId = res.body[0]._id;
          updateClient.id = clientId;
          chai
            .request(app)
            .put(`/api/clients/${clientId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updateClient)
            .then((res) => {
              expect(res).to.have.status(200);
              expect(res.body.firstName).to.equal(updateClient.firstName);
            });
        });
    });
  });
});
