const path = require('path');
const fs = require('fs');
const readdir = require('readdir-plus');

module.exports = opts => {

  if (!opts.path) {
    throw new Error('Routes path must be provided');
  }

  opts.path = path.join(path.resolve(), opts.path);

  if (fs.lstatSync(opts.path).isFile()) {
    return [opts.path];
  }

  let readOpts = {
    recursive: false,
    return: 'fullPaths',
    sync: true,
    filter: {
      file: /\.(js)$/i
    }
  };

  return readdir(opts.path, readOpts);
};
