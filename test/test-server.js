/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')

const { app, runServer, closeServer } = require('../server')
const { PORT, TEST_DATABASE_URL } = require('../config')

const { expect } = chai

chai.use(chaiHttp)

mocha.describe('Index page', () => {
  before(() => {
    runServer(TEST_DATABASE_URL, PORT)
  })

  after(() => {
    closeServer()
  })

  mocha.it('should return 200 status', () =>
    chai
      .request(app)
      .get('/')
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.be.html
      })
  )
})
