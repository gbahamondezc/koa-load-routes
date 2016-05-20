'use strict';

const loader  = require('../lib/loader.js');
const Koa     = require('koa');
const request = require('supertest');

describe('loader.js - Routes loader', function () {

  var app;
  beforeEach(function() {
    app = new Koa();
  });

  describe('Single route file', function () {
    it('should GET -> status -> [200]', function (done) {

      app.use(loader({
        path  : 'test/routes/single.js',
        async : false
      }));

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
      app.use(loader({
        path   : 'test/routes/single.js',
        args   : [304]
      }));

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

      app.use(loader({
        path   : 'test/routes/single.js',
        args   : [200, {name : 'test'}]
      }));

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

    it('Should add base to route', function(done) {
      app.use(loader({
        path   : 'test/routes/single.js',
        args   : [200, {name : 'test'}],
        base   : 'sample'
      }));

      request(app.listen())
        .get('/sample/route-gen')
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
    it('should GET -> status -> [200]', function (done) {

      app.use(loader({
        path  : 'test/routes/multiple'
      }));

      request(app.listen())
        .get('/second-route-gen')
        .expect(200)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('Multiple loader calls - should GET -> status -> [200]', function(done) {

      app.use(loader({
        path   : 'test/routes/single.js',
        args   : [200, {name : 'test'}],
        base   : 'sample'
      }));

      app.use(loader({
        path  : 'test/routes/multiple'
      }));

      request(app.listen())
        .get('/second-route-gen')
        .expect(200)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

});
