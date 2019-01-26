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

// this function deletes the entire database.
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

  for (let i = 1; i <= 10; i += 1) {
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

describe('Client-a-roo server Client endpoint tests', () => {
  before(() => runServer(TEST_DATABASE_URL, TEST_PORT)
    .then(() => tearDownOldDb())
    .then(() => registerTestUser())
    .then(() => loginTestUser())
    .then(token => setAuthToken(token))
    .then(() => getUserId())
    .then(() => seedClientData()));
  after(() => closeServer());

  describe('Client GET request to "/api/clients/"', () => {
    it('should return a list of clients', () => chai
      .request(app)
      .get('/api/clients/')
      .set('Authorization', `Bearer ${authToken}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.lengthOf.at.least(1);
      }));
  });

  describe('Client POST request to "/api/clients/"', () => {
    it('should add a client to user list of clients', () => {
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
});
