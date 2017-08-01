const KoaRouter = require('koa-router');
const path = require('path');
const Koa = require('koa');


module.exports = (files, opts = {}) => {
  let app = new Koa();
  files.forEach(file => {
    let fn = require(file);
    let route = build(fn, opts);
    app.use(route.routes());
  });
  return app;
};


function build(fn, opts = {}) {

  let verbs = [
    'get', 'post', 'put',
    'delete', 'patch', 'options',
    'connect', 'trace'
  ];

  let router = new KoaRouter();

  verbs.forEach(verb => {
    fn.prototype[verb] = function (...argms) {
      if (path.parse(argms[0])) {
        let uri = argms[0];
        let curl = path.join(`/${opts.base || ''}`, `${uri}`);

        let middlewares = Array.prototype.slice.apply(
          argms,
          [1, argms.length]
        )
          .map(function (middleware) {
            return middleware;
          });

        if (opts.firstMiddleware) {
          middlewares.unshift(opts.firstMiddleware);
        }

        let params = [curl].concat(middlewares);
        router[verb](...params);
        return this;
      }
      return undefined;
    };
  });
  let args = [null].concat(opts.args);
  new (fn.bind(...args));
  return router;
}