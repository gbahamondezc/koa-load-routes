const KoaRouter = require('koa-router');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const verbs = require('./http-verbs');

module.exports = (files = [], opts = {}) => {
  let app = new Koa();
  app.use(bodyParser());
  for (let file of files) {
    let route = build(require(file), opts);
    app.use(route.routes());
  }
  return app;
};


function build(fn, opts = {}) {
  let router = new KoaRouter();
  verbs.forEach(verb => {
    fn.prototype[verb] = function (...argms) {
      if (path.parse(argms[0])) {
        let uri = argms[0];
        let curl = path.join(`/${opts.base || ''}`, `${uri}`);
        let middlewares = Array.prototype.slice
          .apply(argms, [1, argms.length]);
        if (opts.middlewares.length) {
          middlewares.unshift(...opts.middlewares);
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