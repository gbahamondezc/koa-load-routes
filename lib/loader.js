'use strict';

const read = require('./reader.js');
const router = require('./router.js');

module.exports = function (app, opts) {
  opts = opts || {};

  if (!app) {
    throw new Error('koa app as first parameter expected');
  }

  var result = read(opts);

  var ropts = {
    base   : opts.base,
    inject : opts.inject
  };

  if ('function' === typeof result.then) {
    return new Promise(resolve => {
      result.then(files => {
        return resolve(router(app, files, ropts));
      })
      .catch(err => {
        throw err;
      });
    });
  }
  return router(app, result, ropts);
};
