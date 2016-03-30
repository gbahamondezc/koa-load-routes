'use strict';

const loader  = require('../lib/loader.js');
const Koa     = require('koa');
const request = require('supertest');
const chai    = require('chai');
const expect  = chai.expect;



describe('loader.js - Routes loader', function () {

  describe('Exceptions', function() {
    it('Should throw \'Koa app as first parameter expected\' Exception', function () {
      expect(loader.bind(loader)).to.throw('koa app as first parameter expected');
    });
  });

  describe('Single route file', function () {
    it('should GET -> status -> [200] - Sync', function (done) {

      var app = loader(new Koa(), {
        path  : 'test/routes/single.js',
        async : false
      });

      request(app.listen())
        .get('/route-gen')
        .expect(200)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('Should return status passed as first argument', function (done) {
      var app = loader(new Koa(), {
        path   : 'test/routes/single.js',
        async  : false,
        args   : [304]
      });

      request(app.listen())
        .get('/route-gen')
        .expect(304)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('Should return status passed as first argument and body  passed as second arg', function (done) {
      var app = loader(new Koa(), {
        path   : 'test/routes/single.js',
        async  : false,
        args   : [200, {name : 'test'}]
      });
      request(app.listen())
        .get('/route-gen')
        .expect(200, {
          name : 'test'
        })
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });



  describe('Multipe routes files', function () {
    it('should GET -> status -> [200] - Async', function (done) {

      loader(new Koa(), {
        path  : 'test/routes/multiple',
        async : true
      })
      .then(app => {

        request(app.listen())
          .get('/second-route-gen')
          .expect(200)
          .end(err => {
            if (err) {
              console.log("err --> ", err);
              return done(err);
            }
            done();
          });

      })
      .catch(err => {
        return done(err);
      });

    });
  });

});
