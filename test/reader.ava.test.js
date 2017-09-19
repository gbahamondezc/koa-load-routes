const test = require('ava');
const path = require('path');
const reader = require('../lib/reader');


test('Should throw exception of missing path', t => {
  let error = t.throws(() => reader({}));
  t.is(error.message, 'Path for read routes is missing, add a {path} option');
  t.true(error instanceof Error);
});


test('Expect to throw exception of path must be a string', t => {
  let error = t.throws(() => reader({ path: 10 }));
  t.is(error.message, 'path option must be a string');
  t.true(error instanceof Error);
});


test('Expect throw exception of not found directory or file', t => {
  let error = t.throws(() => reader({ path: 'deioj' }));
  t.is(error.message, 'ENOENT: no such file or directory, lstat \'deioj\'');
  t.true(error instanceof Error);
});


test('Should return array with length 1', t => {
  let result = reader({
    path: `${path.resolve()}/test/routes/single.js`
  });
  t.true(result instanceof Array);
  t.is(result.length, 1);
});


test('Should return an array of files without routes in sub directory', t => {
  let results = reader({
    path: `${path.resolve()}/test/routes/multiple`,
    recursive: false
  });
  t.is(results.length, 3);
});


test('Should return an array of files with routes in sub directory', t => {
  let results = reader({
    path: `${path.resolve()}/test/routes/multiple`,
    recursive: true
  });
  t.is(results.length, 5);
});


test('Should return an array of only 1 element filtering by suffix', t => {
  let results = reader({
    path: `${path.resolve()}/test/routes/multiple`,
    recursive: true,
    suffix: 'route'
  });

  t.is(results.length, 2);
});

