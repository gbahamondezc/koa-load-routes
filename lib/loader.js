const read = require('./reader.js');
const router = require('./router.js');
const mount = require('koa-mount');

module.exports = (opts = {}) => {

  // Default options
  opts.base = opts.base || '';
  opts.args = opts.args || [];
  opts.middlewares = opts.middlewares || [];

  // Read files
  let files = read(opts);

  let routed = false;

  let app = router(files, opts);

  return (ctx, next) => {
    if (routed) {
      return next();
    }
    ctx.app.use(mount(app));
    routed = true;
    return next();
  };
};
