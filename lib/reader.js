'use strict';


const bluebird  = require('bluebird');
const path      = require('path');
const fs        = require('fs');
const readdir = require('readdir-plus');
const readdirPromise = bluebird.promisify(
  readdir
);


function reader (opts) {

  if (!opts.path) {
    throw new Error('Routes path must be provided');
  }

  var readSync = (opts.async === undefined) ? false : !opts.async;

  opts.path = path.join(path.resolve(), opts.path);

  if (fs.lstatSync(opts.path).isFile()) {
    return [opts.path];
  }

  var readOpts = {
    recursive : false,
    return    : 'fullPaths',
    sync      : readSync,
    filter    : {
      file  : /\.(js)$/i
    }
  };

  if (readSync) {
    return readdir(opts.path, readOpts);
  }
  else {
    return readdirPromise(opts.path, readOpts);
  }
}

module.exports = reader;
