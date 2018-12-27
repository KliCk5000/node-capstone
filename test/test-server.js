/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')

const { app, runServer, closeServer } = require('../server')
const { PORT, TEST_DATABASE_URL } = require('../config')

const { expect } = chai

chai.use(chaiHttp)

describe('Client Relationship Management Tests', () => {
  before(() => {
    runServer(TEST_DATABASE_URL, PORT)
  })

  after(() => {
    closeServer()
  })

  describe('generic "/" get request to index.html', () => {
    it('should return 200 status', () =>
      chai
        .request(app)
        .get('/')
        .then(res => {
          expect(res).to.have.status(200)
          expect(res).to.be.html
        }))
  })

  describe('Client GET request to "/api/clients/"', () => {
    it('should return a list of clients', () =>
      chai
        .request(app)
        .get('/api/clients/')
        .then(res => {
          expect(res).to.have.status(200)
          expect(res).to.be.json
          res.body.forEach(item => expect(item).to.be.a('object'))
        }))
  })

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
        reminders: 'Aut commodi vitae.'
      }
      chai
        .request(app)
        .post('/api/clients/')
        .send(newClient)
        .then(res => {
          expect(res).to.have.status(201)
          expect(res).to.be.json
        })
    })
  })
})
