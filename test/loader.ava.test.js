const loader = require('../lib/loader');
const Koa = require('koa');
const request = require('supertest');
const test = require('ava');

let app = null;

test.beforeEach(t => {
  app = new Koa();
  t.pass();
});


test('Single route file, Should GET -> status 200', async t => {
  app.use(loader({
    path: 'test/routes/single.js',
    // @TODO is this important?
    async : false
  }));

  let response = await request(app.listen())
    .get('/route-gen');

  t.is(response, 'eiwuhdi');
});


test('Single route file, Should return status passed as first argument', async t => {
  app.use(loader({
    path   : 'test/routes/single.js',
    args   : [304]
  }));

  let response = await request(app.listen())
    .get('/route-gen');

  t.is(response, 'qhiduhwei');
});

