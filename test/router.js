const router = require('../lib/router.js');
const reader = require('../lib/reader.js');
const request = require('supertest');
const Koa = require('koa');

describe('router.js - App routes generation', function() {

  it('Should return status -> [200] on /route-gen GET', function(done) {
    var readRes = reader({
      path: 'test/routes/single.js'
    });

    var app = router(new Koa(), readRes);

    request(app.listen())
      .get('/route-gen')
      .expect(200)
      .end(err => {
        if (err) {
          console.log(err);
          return done(err);
        }
        done();
      });
  });
});
