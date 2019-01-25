const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../app');
const { TEST_PORT, TEST_DATABASE_URL } = require('../config');

const { expect } = chai;

chai.use(chaiHttp);

describe('Client-a-roo Server Tests', () => {
  before(() => {
    runServer(TEST_DATABASE_URL, TEST_PORT);
  });

  after(() => {
    closeServer();
  });

  describe('generic "/" get request to index.html', () => {
    it('should return 200 status', () => chai
      .request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      }));
  });
});
