'use strict';

const assert = require('assert');
const request = require('supertest');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const stubbedRequest = sinon.stub();
const app = proxyquire('../server', {request: stubbedRequest});

describe("Employee Service Test", () => {
  afterEach(() => {
    stubbedRequest.reset();
  });

  stubbedRequest.withArgs('http://localhost:3000/api/employee?id=1').yields(null, {statusCode:200}, JSON.stringify({ name: 'Bob', office_location: 'Bangalore' }))
  stubbedRequest.yields(null, {statusCode:200}, JSON.stringify({ payroll: '1000000' }))
  it("should return correct employee for provided employee id", (done) => {
    request(app)
      .get('/api/info?id=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        const expectedEmployee = { name: 'Bob', office_location: 'Bangalore', payroll: '1000000' };
        assert.deepEqual(res.body, expectedEmployee);
        done();
      });
  });

  it("should return not found for unknown employee id", (done) => {
    stubbedRequest.yields(null, {statusCode:404}, { error: 'Not Found'})
    request(app)
      .get('/api/info?id=100')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        const expectedRes = { error: 'Not Found'};
        assert.deepEqual(res.body, expectedRes)
        done();
      });
  });
});
