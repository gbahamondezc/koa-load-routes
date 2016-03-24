'use strict';

const KoaRouter = require('koa-router');
const convert = require('koa-convert');
const path = require('path');


module.exports = function router (app, files, opts) {
  opts = opts || {};
  files.forEach(file => {
    var fn = require(file);
    var route = buildRoute(fn, opts);
    app.use(route.routes());
  });
  return app;
};


function buildRoute (fn, opts) {
  opts = opts || {};
  var verbs  = ['get', 'post', 'put', 'delete'];
  var router = new KoaRouter();
  verbs.forEach( verb => {
    fn.prototype[verb] = (uri, actionFunction) => {
      var curl = path.join(`/${opts.base || ''}`, `${uri}`);
      router[verb](curl, koa1To2Middleware(actionFunction));
    };
  });
  new fn();
  return router;
}


function koa1To2Middleware (fn) {
  if ('GeneratorFunction' === fn.constructor.name) {
    return convert(fn);
  }
  return fn;
}