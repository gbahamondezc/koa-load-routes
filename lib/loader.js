const read = require('./reader.js');
const router = require('./router.js');
const mount = require('koa-mount');

module.exports = (opts = {}) => {
  let result = read(opts);

  let ropts = {
    base: opts.base,
    args: opts.args,
    firstMiddleware: opts.firstMiddleware
  };

  let routed = false;
  let app = router(result, ropts);

  return (ctx, next) => {
    if (routed) {
      return next();
    }
    ctx.app.use(mount(app));
    routed = true;
    return next();
  };
};
