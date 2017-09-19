const fs = require('fs');
const glob = require('glob-promise');

module.exports = (opts = {}) => {

  // Validations
  if (!opts.path) {
    throw new Error('Path for read routes is missing, add a {path} option');
  }

  if ('string' !== typeof opts.path) {
    throw new Error('path option must be a string');
  }

  opts.suffix = opts.suffix || '';
  opts.recursive = opts.recursive || false;
  let pattern = `*${opts.suffix}.js`;

  if (opts.recursive) {
    pattern = `**/*${opts.suffix}.js`;
  }

  if (fs.lstatSync(opts.path).isFile()) {
    return [opts.path];
  }

  let readOptions = {
    cwd: opts.path,
    realpath: true
  };

  return glob.sync(pattern, readOptions);
};
