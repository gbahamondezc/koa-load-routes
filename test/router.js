const router = require('../lib/router.js');
const reader = require('../lib/reader.js');
const request = require('supertest');
const Koa = require('koa');
const mount = require('koa-mount');

describe('router.js - App routes generation', function() {

  it('Should return status -> [200] on /route-gen GET', function(done) {

    var app = new Koa();

    var readRes = reader({
      path: 'test/routes/single.js'
    });

    var routesApp = router(readRes);

    app.use(mount(routesApp));

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
