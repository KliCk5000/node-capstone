const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../../app');
const { TEST_PORT, TEST_DATABASE_URL } = require('../../config');

const { expect } = chai;

chai.use(chaiHttp);

// this function deletes the entire database.
// we'll call it in an `after` block below
// to ensure data from one test does not stick
// around for next one
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

describe('Client-a-roo server Auth endpoint tests', () => {
  before(() => runServer(TEST_DATABASE_URL, TEST_PORT));

  // afterEach(() => tearDownDb());

  after(() => tearDownDb().then(() => closeServer()));

  describe('Creating User', () => {
    const requiredFields = ['username', 'password'];
    const stringFields = ['username', 'password', 'firstName', 'lastName'];
    const explicityTrimmedFields = ['username', 'password'];
    const body = {
      username: 'Testing',
      password: 'testtest123',
      firstName: 'Tester',
      lastName: 'McTesting',
    };

    requiredFields.forEach((field) => {
      const testingBody = {};
      Object.assign(testingBody, body);
      delete testingBody[field];
      it(`Missing a ${field} should return ValidationError: Missing ${field}`, () => chai
        .request(app)
        .post('/api/users/')
        .send(testingBody)
        .then((res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.include({ type: 'error' });
          expect(res.body)
            .to.have.property('reason')
            .equal('ValidationError');
          expect(res.body)
            .to.have.property('message')
            .equal('Missing field');
          expect(res.body)
            .to.have.property('location')
            .equal(field);
        }));
    });

    stringFields.forEach((field) => {
      const testingBody = {};
      Object.assign(testingBody, body);
      testingBody[field] = 9000;
      it(`Non String ${field} should return ValidationError: Incorrect Type - not String in ${field}`, () => chai
        .request(app)
        .post('/api/users/')
        .send(testingBody)
        .then((res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.include({ type: 'error' });
          expect(res.body)
            .to.have.property('reason')
            .equal('ValidationError');
          expect(res.body)
            .to.have.property('message')
            .equal('Incorrect field type: expected string');
          expect(res.body)
            .to.have.property('location')
            .equal(field);
        }));
    });

    explicityTrimmedFields.forEach((field) => {
      const testingBody = {};
      Object.assign(testingBody, body);
      testingBody[field] += '   ';
      it(`Trailing whitespace in ${field} should return ValidationError: Cannot start or end with whitespace in ${field}`, () => chai
        .request(app)
        .post('/api/users/')
        .send(testingBody)
        .then((res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.include({ type: 'error' });
          expect(res.body)
            .to.have.property('reason')
            .equal('ValidationError');
          expect(res.body)
            .to.have.property('message')
            .equal('Cannot start or end with whitespace');
          expect(res.body)
            .to.have.property('location')
            .equal(field);
        }));
    });

    it('Creating a user with all correct fields should pass', () => chai
      .request(app)
      .post('/api/users/')
      .send(body)
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('username').equal(body.username);
      }));
  });
});
