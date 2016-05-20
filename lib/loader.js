'use strict';

const read = require('./reader.js');
const router = require('./router.js');
const mount = require('koa-mount');

module.exports = function (opts) {
  opts = opts || {};

  var result = read(opts);

  var ropts = {
    base  : opts.base,
    args  : opts.args,
    firstMiddleware : opts.firstMiddleware
  };

  var routed = false;
  var app = router(result, ropts);

  return function(ctx, next) {
    if (routed) {
      return next();
    }
    ctx.app.use(mount(app));
    routed = true;
    return next();
  };
};
