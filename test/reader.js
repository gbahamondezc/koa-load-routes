const reader = require('../lib/reader.js');

const chai = require('chai');
const chaiPromised = require('chai-as-promised');
const assert = require('assert');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiPromised);

describe('reader.js - Read route files', function () {

  describe('Exceptions', function() {
    it('Expect throw exception of missing path ', function () {
      expect(reader.bind(reader, {}))
        .to.throw('Routes path must be provided');
    });

    it('Expect throw exception of path must be a string', function () {
      expect(reader.bind(reader, {path : 10}))
        .to.throw('Path must be a string. Received 10');
    })

    it('Expect throw exception of not found directory or file', function () {
      expect(reader.bind(reader, { path : 'deioj' }))
        .to.throw('ENOENT');
    });
  });



  describe('Asynchronous read', function() {
    it('Should return promise', function() {
      var promise = reader({
        path  : 'test/routes/multiple',
      });
      promise.should.have.property('then');
    });

    it('Should resolve array of files', function() {
      reader({
        path  : 'test/routes/multiple'
      })
      .should
      .eventually
      .be
      .a('array');
    });

    it('Should throw ENOENT exception', function() {
      expect(reader.bind(reader, {
        path  : 'some/fake/route',
        async : false
      }))
      .to
      .throw('ENOENT');
    });
  });

  describe('Single js file', function() {
    it('Should return array with length 1', function() {
      reader({
        path  : 'test/routes/single.js',
      })
      .should.be.a('array')
      .with
      .length(1);
    });
  });

  describe('Synchronous read', function() {
    it('Should return array of files', function() {
      var result = reader({
        path  : 'test/routes/multiple',
        async : false
      });
      result.should.be.a('array');
    });
  });
});