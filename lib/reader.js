const path = require('path');
const fs = require('fs');
const readdir = require('readdir-plus');
const glob = require('glob-promise');

module.exports = (opts = {}) => {

  // Validations
  if (!opts.path) {
    throw new Error('Path for read routes is missing, add a {path} option');
  }

  if ('string' !== typeof opts.path) {
    throw new Error('path option must be a string');
  }

  opts.suffix = opts.suffix || '.js';
  opts.recursive = opts.recursive || false;

  opts.path = path.join(path.resolve(), opts.path);

  if (fs.lstatSync(opts.path).isFile()) {
    return [opts.path];
  }

  let readOpts = {
    recursive : opts.recursive,
    return    : 'fullPaths',
    sync      : true,
    filter: {
      // file : new RegExp(`${opts.suffix}.(js)$`, 'i')
      regex  : /\.(ss)$/i
    }
  };

  return readdir(opts.path, readOpts);
};
