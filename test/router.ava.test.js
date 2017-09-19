const router = require('../lib/router');
const reader = require('../lib/reader');
const request = require('supertest');
const Koa = require('koa');
const mount = require('koa-mount');
const path = require('path');
const test = require('ava');

test('Should return status -> 200 on /route-gen', async t => {
  const app = new Koa();
  const routesPath = `${path.resolve()}/test/routes/single.js`;

  const routeFiles = reader({
    path: routesPath
  });

  let routes = router(routeFiles, { middlewares: [] });

  app.use(mount(routes));

  let response = await request(app.listen())
    .get('/route-gen');

  t.is(response.status, 200);

  let response2 = await request(app.listen())
    .get('/route-fn');

  t.is(response2.status, 200);

});