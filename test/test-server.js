const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");

const { app } = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Index page", function() {
  it("should return 200 status", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});
