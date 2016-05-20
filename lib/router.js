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
  var verbs  = [
    'get', 'post',
    'put', 'delete',
    'patch'
  ];
  var router = new KoaRouter();
  verbs.forEach(verb => {
    Fn.prototype[verb] = function () {
      if (path.parse(arguments[0])) {
        var uri  = arguments[0];
        var curl = path.join(`/${opts.base || ''}`, `${uri}`);
        var middlewares = Array.prototype.slice.apply(
          arguments,
          [1, arguments.length]
        )
        .map(function(middleware) {
          return koa1To2Middleware(middleware);
        });
        if (opts.firstMiddleware) {
          middlewares.unshift(koa1To2Middleware(opts.firstMiddleware));
        }
        var args = [curl].concat(middlewares);
        router[verb].apply(router, args);
        return this;
      }
    };
  });
  var args = [null].concat(opts.args);
  new (Fn.bind.apply(Fn, args));
  return router;
}


function koa1To2Middleware (fn) {
  if (!fn) {
    return function(ctx, next) {
      next();
    };
  }
  if ('GeneratorFunction' === fn.constructor.name) {
    return convert(fn);
  }
  return fn;
}
