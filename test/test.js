process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

describe('Test of API', function() {

  beforeEach((done) => { //Before each test we empty the database
    // Clear tables here
    done();                 
  });

  describe('/try', () => {
    it('should return Hello', (done) => {
      chai.request(server)
        .get('/try')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});