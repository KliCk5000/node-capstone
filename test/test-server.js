const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')
const faker = require('faker')
const mongoose = require('mongoose')

const { app } = require('../server')
const { PORT, TEST_DATABASE_URL } = require('../config')

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect

chai.use(chaiHttp)

mocha.describe('Index page', () => {
  mocha.it('should return 200 status', () => {
    return chai
      .request(app)
      .get('/')
      .then(res => {
        expect(res).to.have.status(200)
      })
  })
})
