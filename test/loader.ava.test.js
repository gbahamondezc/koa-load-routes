const loader = require('../lib/loader');
const Koa = require('koa');
const request = require('supertest');
const test = require('ava');
const path = require('path');
const logger = require('koa-logger');

let app = null;

test.beforeEach(t => {
  app = new Koa();
  t.pass();
});

test('Single route file, Should GET -> status 200', async t => {
  let routesPath = `${path.resolve()}/test/routes/single.js`;

  app.use(loader({
    path: routesPath
  }));

  let response = await request(app.listen())
    .get('/route-gen');

  t.is(response.status, 200);
});


test('Single route file, Should return status passed as first argument', async t => {
  let routesPath = `${path.resolve()}/test/routes/single.js`;

  app.use(loader({
    path: routesPath,
    args: [304]
  }));

  let response = await request(app.listen())
    .get('/route-gen');

  t.is(response.status, 304);
});

test('Should return status passed as first argument & body as second one', async t => {
  let routesPath = `${path.resolve()}/test/routes/single.js`;

  app.use(loader({
    path: routesPath,
    args: [200, { name: 'something' }]
  }));

  let response = await request(app.listen())
    .get('/route-gen');

  t.is(response.status, 200);

  t.deepEqual(response.body, {
    name: 'something'
  });
});


test('Should add base to route', async t => {
  let routesPath = `${path.resolve()}/test/routes/single.js`;

  app.use(loader({
    path: routesPath,
    args: [200, { name: 'test' }],
    base: 'sample'
  }));

  let response = await request(app.listen())
    .get('/sample/route-gen');

  t.is(response.status, 200);

  t.deepEqual(response.body, {
    name: 'test'
  });
});


test('(Multiple files) should get status 200', async t => {
  let routesPath = `${path.resolve()}/test/routes/multiple`;

  app.use(loader({
    path: routesPath
  }));

  let response = await request(app.listen())
    .get('/second-route-gen');

  t.is(response.status, 200);
});


test('(Multiple files) should get status 200 and body', async t => {
  let multipleRoutesPath = `${path.resolve()}/test/routes/multiple`;
  let singleRoutesPath = `${path.resolve()}/test/routes/single.js`;

  app.use(loader({
    path: multipleRoutesPath,
    recursive: true,
    args: [200, { name: 'test' }],
    base: 'sample'
  }));

  app.use(loader({
    path: singleRoutesPath
  }));

  let requestObj = request(app.listen());

  let response1 = await requestObj.get('/sample/sub/four-sub-route-fn');
  t.is(response1.status, 200);

  let response2 = await requestObj.get('/route-fn');
  t.is(response2.status, 200);
});


test('(Multiple files) should load only routes which ends with given suffix', async t => {
  let multipleRoutesPath = `${path.resolve()}/test/routes/multiple`;

  app.use(loader({
    path: multipleRoutesPath,
    recursive: true,
    base: 'api',
    suffix: 'route'
  }));

  let requestObj = request(app.listen());

  let notFoundResponse = await requestObj
    .get('/api/first-route-fn');

  t.is(notFoundResponse.status, 404);

  let response = await requestObj
    .get('/api/third-route-gen');

  t.is(response.status, 200);
});


test('(Multiple files) should exect the given middlewares in the supplied order', async t => {
  let multipleRoutesPath = `${path.resolve()}/test/routes/multiple`;

  app.use(loader({
    path: multipleRoutesPath,
    recursive: true,
    base: 'api',
    middlewares: [
      logger(),
      async (ctx, next) => {
        console.info('Middleware 1');
        await next();
      },
      async (ctx, next) => {
        console.info('Middleware 2');
        ctx.status = 202;
      }
    ]
  }));

  let response = await request(app.listen())
    .get('/api/first-route-fn');
  t.is(response.status, 202);
});