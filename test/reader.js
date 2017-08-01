const reader = require('../lib/reader.js');
const chai = require('chai');
const chaiPromised = require('chai-as-promised');

chai.should();
const expect = chai.expect;

chai.use(chaiPromised);

describe('reader.js - Read route files', () => {

  describe('Exceptions', () => {
    it('Expect throw exception of missing path ', () => {
      expect(reader.bind(reader, {}))
        .to.throw('Routes path must be provided');
    });

    it('Expect throw exception of path must be a string', () => {
      expect(reader.bind(reader, {path : 10}))
        .to.throw('Path must be a string. Received 10');
    });

    it('Expect throw exception of not found directory or file', () => {
      expect(reader.bind(reader, {path : 'deioj'}))
        .to.throw('ENOENT');
    });
  });


  describe('Single js file', () => {
    it('Should return array with length 1', () => {
      reader({
        path  : 'test/routes/single.js'
      })
        .should.be.a('array')
        .with
        .length(1);
    });
  });

  describe('Multiple read', function () {
    it('Should return array of files without routes in sub directories', function () {
      var result = reader({
        path: 'test/routes/multiple',
        recursive: false,
        async: false
      });
      result.should.be.a('array');
      expect(`${__dirname}/routes/multiple/sub/subRoute.js`)
        .to.not.be.oneOf(result);
    });
  });

  describe('Multiple read with recursion', function() {
    it('Should return array of files with routes in sub directories', function() {
      var result = reader({
        path      : 'test/routes/multiple',
        recursive : true,
        async     : false
      });
      result.should.be.a('array');

      expect(`${__dirname}/routes/multiple/sub/subRoute.js`)
        .to.be.oneOf(result);
    });
  });
});
