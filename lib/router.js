'use strict';

const KoaRouter = require('koa-router');
const convert = require('koa-convert');
const path = require('path');
const Koa = require('koa');


module.exports = function router (files, opts) {
  opts = opts || {};
  var app = new Koa();
  files.forEach(file => {
    var fn = require(file);
    var route = buildRoute(fn, opts);
    app.use(route.routes());
  });
  return app;
};


function buildRoute (Fn, opts) {
  opts = opts || {};
  var verbs  = ['get', 'post', 'put', 'delete'];
  var router = new KoaRouter();
  verbs.forEach(verb => {
    Fn.prototype[verb] = (uri, actionFunction) => {
      var curl = path.join(`/${opts.base || ''}`, `${uri}`);
      router[verb](curl, koa1To2Middleware(actionFunction));
    };
  });
  var args = [null].concat(opts.args);
  new (Fn.bind.apply(Fn, args));
  return router;
}


function koa1To2Middleware (fn) {
  if ('GeneratorFunction' === fn.constructor.name) {
    return convert(fn);
  }
  return fn;
}
